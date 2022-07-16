<template>
  <q-page class="fit column items-center justify-evenly">
    <q-btn label="Backup to XLSX" color="positive" @click="exportToExcel" />
    <div>
      <div class="text-negative text-h6">
        Warning! It will rewrite all your data.
      </div>
      <q-file
        color="grey-3"
        outlined
        label-color="negative"
        v-model="file"
        label="Recovery file"
        @update:model-value="importFile"
      >
        <template v-slot:append>
          <q-icon name="attachment" color="negative" />
        </template>
      </q-file>
    </div>
  </q-page>
</template>

<script lang="js">
import { defineComponent, ref } from 'vue';
import FileSaver from 'file-saver';
import XlsxPopulate from 'xlsx-populate/browser/xlsx-populate';
import { useWalletsStore } from 'src/stores/wallets-store';
import { useOperationsStore } from 'src/stores/operations-store';
import { useCategoriesStore } from 'src/stores/categories-store';
import { useRecordStore } from 'src/stores/records-store';

export default defineComponent({
  name: 'DownloadPage',
  setup() {
    const walletsStore = useWalletsStore();
    const operationsStore = useOperationsStore();
    const сategoriesStore = useCategoriesStore();
    const recordsStore = useRecordStore();

    const exportToExcel = function() {
      XlsxPopulate.fromBlankAsync().then(workbook => {
        const sheet1 = workbook.sheet(0).name('Records');
        const sheet2 = workbook.addSheet('Operations');
        const sheet3 = workbook.addSheet('Categories');
        const sheet4 = workbook.addSheet('Wallets');

        const r4 = sheet4.range(1, 1, walletsStore.getWallets.length + 1, 2);
        const walletRowHeaders = ['Wallet', 'Hide'];
        const walletRows = walletsStore.getWallets.map(w=>[w.label, w.hide ? 1 : 0]);
        r4.value([walletRowHeaders, ...walletRows]);

        const r3 = sheet3.range(1, 1, сategoriesStore.getCategories.length + 1, 1);
        const categoryRowHeaders = ['Category'];
        const categoryRows = сategoriesStore.getCategories.map(cat=>[cat]);
        r3.value([categoryRowHeaders, ...categoryRows]);

        const r2 = sheet2.range(1, 1, operationsStore.getOperations.length + 1, 2);
        const operationRowHeaders = ['Operation', 'Category'];
        const operationRows = operationsStore.getOperations.map(w=>[w.label, w.category]);
        r2.value([operationRowHeaders, ...operationRows]);

        const r1 = sheet1.range(1, 1, recordsStore.getRecords.length + 1, walletsStore.getWallets.length * 2 + 4);
        const walletIncAndExp = walletsStore.getWallets.map(w=>[`Inc ${w.label}`, `Exp ${w.label}`])
          .reduce((acc, w) => [...acc, ...w], []);
        const recordRowHeaders = ['Date', 'Operation', 'Category', ...walletIncAndExp, 'Description'];
        const recordRows = recordsStore.getRecords.map(r => {
          const row = [r.date, r.operation.label, r.operation?.category];
          walletIncAndExp
            .filter(wh => wh.slice(0,3) === 'Inc')
            .map(wh => wh.slice(4))
            .map(wh => {
              const foundWallet = r.money.find(w => w.wallet === wh);
              if (foundWallet) {
                row.push(foundWallet.income || 0);
                row.push(foundWallet.expense || 0);
              } else {
                row.push(0);
                row.push(0);
              }
            });
          row.push(r.description);
          return row;
        }).reverse();
        r1.value([recordRowHeaders, ...recordRows]);

        sheet1.row(1).style({'bold': true});
        sheet2.row(1).style({'bold': true});
        sheet3.row(1).style({'bold': true});
        sheet4.row(1).style({'bold': true});

        sheet1.column(1).width(13).hidden(false);
        sheet1.column(2).width(25).hidden(false);
        sheet1.column(3).width(15).hidden(false);
        sheet1.column(recordRowHeaders.length).width(25).hidden(false);

        // sheet.column('D').width(50).hidden(false);
        // for (let col = 5; col < headers.length; col++) {
        //   sheet.column(col).width(13).hidden(false);
        // }
        // sheet.column(headers.length).width(30).hidden(false);

        // if (this.isABMode) {
        //   sheet.row(1).style({ wrapText: true, horizontalAlignment: 'center', verticalAlignment: 'bottom' });
        //   sheet.range(1, 1, 1, headers.length).style('fill', lightBlue);
        //   sheet.range(4, 1, 4, headers.length).style({ fill: darkGrey, bold: true });
        //   workbook.sheet(0).range(2, 1, 3, 1).style('fill', lightGrey);
        //   workbook.sheet(0).range(1, 1, 4, headers.length).style({ border: true });
        // }

        // sheet.row(1 + rowsModeA).style({ wrapText: true, horizontalAlignment: 'center', verticalAlignment: 'bottom' });
        // sheet.range(1 + rowsModeA, 1, 1 + rowsModeA, headers.length).style('fill', lightPink);
        // sheet.range(4 + rowsModeA, 1, 4 + rowsModeA, headers.length).style({ fill: darkGrey, bold: true });
        // workbook.sheet(0).range(2 + rowsModeA, 1, 3 + rowsModeA, 1).style('fill', lightGrey);
        // workbook.sheet(0).range(1 + rowsModeA, 1, 4 + rowsModeA, headers.length).style({ border: true });
        // workbook.sheet(0).range(2 + rowsModeA, 5, 3 + rowsModeA, headers.length).style('fill', greenPosle);

        workbook.outputAsync(workbook).then(blob => {
          FileSaver.saveAs(blob, `wallet backup ${new Date().toLocaleString()}.xlsx`);
        });
      });
    };

    const file = ref();

    const importFile = function() {
      if (!file.value) return;

      XlsxPopulate.fromDataAsync(file.value).then((workbook) => {
        const records = workbook.sheet('Records').usedRange().value();
        const operations = workbook.sheet('Operations');
        const categories = workbook.sheet('Categories');
        const wallets = workbook.sheet('Wallets');

        const moneyHeaders = records[0].slice(3, records[0].length - 1);
        const allWallets = Object.keys([...Array(moneyHeaders.length / 2)])
          .map(i => moneyHeaders[i * 2].slice(4));

        recordsStore.setRecords(
          records.slice(1).map((r, idx) => {
            const money = allWallets.map((w, valIdx) => {
              let resMoney = { wallet: w };
              if (r[3 + valIdx * 2]) resMoney.income = r[3 + valIdx * 2];
              if (r[3 + valIdx * 2 + 1]) resMoney.expense = r[3 + valIdx * 2 + 1];
              return resMoney;
            })
            return {
              id: idx + 1,
              date: r[0],
              operation: { label: r[1], category: r[2] },
              money,
              description: r[r.length - 1]
            };
          })
        )

        operationsStore.setOperations(
          operations.usedRange().value().slice(1).map(op => ({ label: op[0], category: op[1] }))
        )

        сategoriesStore.setCategories(
          categories.usedRange().value().slice(1).reduce((acc, cat) => [...acc, cat[0]], [])
        )

        walletsStore.setWallets(
          wallets.usedRange().value().slice(1).map(w => ({ label: w[0], hide: !!w[1] }))
        )

      }).catch(err => {
        window.showToast('Ошибка загрузки. Неверный формат или данные документа.', err);
      });
    }

    return {
      exportToExcel,
      importFile,
      file
    };
  },
});
</script>
