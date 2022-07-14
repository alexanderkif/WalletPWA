import{Q as H}from"./QPage.2df70313.js";import{a as g}from"./QBtn.f27161c1.js";import{c as _,d as G,e as w,Q as h,C as b,f as J,g as y,h as Y}from"./QTable.cf6eebdc.js";import{a as V,Q as $}from"./QCard.b3482b9a.js";import{a2 as Z,B as P,r as i,c as j,Z as R,_ as k,n as S,C as Q,L as B,F as o,E as l,K as U,al as A,v as D,H as m,I as O,D as z,J as T}from"./index.7503b3fc.js";import{P as f}from"./LocalStorage.dcdc0aae.js";import{u as F}from"./operations-store.96f98a32.js";import"./render.b4e954cd.js";import"./QChip.5bba6951.js";import"./use-dark.2e4a7767.js";import"./format.3e32b8d9.js";import"./selection.e9de38d7.js";const M=Z("categories-store",{state:()=>({categories:f.getItem("categories")||[]}),getters:{getCategories:e=>e.categories},actions:{storageCategories(){f.set("categories",this.categories)},setCategories(e){this.categories=e,this.storageCategories()},addCategory(e){this.categories.push(e),this.storageCategories()},removeCategorie(e){this.categories=this.categories.filter(t=>t!==e),this.storageCategories()}}}),W=P({name:"OperationAddingComponent",setup(){const e=F(),t=M(),s=i(),u=i(),p=i(!1),d=i(""),a=i(""),r=i(""),v=i(),N=j(()=>[...t.getCategories,"Add category"]),C=i(!1);R(async()=>{var n,c;r.value==="Add category"&&(C.value=!0,await S(),(c=(n=u.value)==null?void 0:n.$el)==null||c.focus(),r.value="")});async function K(){var n,c;d.value="",p.value=!0,await S(),(c=(n=s.value)==null?void 0:n.$el)==null||c.focus()}function q(){var n;d.value.length<3||(e.addOperation({label:d.value,category:r.value}),d.value="",(n=s.value)==null||n.resetValidation(),p.value=!1)}function I(){var n;a.value.length<3||(t.addCategory(a.value),r.value=a.value,a.value="",(n=u.value)==null||n.resetValidation(),C.value=!1)}return{openAddOperationDialog:K,addDialogOpened:p,saveOperation:q,operationName:d,inputOperationNameRef:s,category:r,categories:v,filterFn:function(n,c){if(n===""){c(()=>{v.value=N.value});return}c(()=>{const L=n.toLowerCase();v.value=N.value.filter(E=>E.toLowerCase().indexOf(L)>-1)})},categoryName:a,addCategoryDialogOpened:C,inputCategoryRef:u,saveCategory:I}}}),X={class:"q-px-md full-width"},x={class:"row full-width"};function ee(e,t,s,u,p,d){return Q(),B("div",X,[o(g,{color:"positive",icon:"add",glossy:"",label:"Add Operation",onClick:e.openAddOperationDialog},null,8,["onClick"]),o(h,{modelValue:e.addDialogOpened,"onUpdate:modelValue":t[2]||(t[2]=a=>e.addDialogOpened=a),persistent:"","transition-show":"scale","transition-hide":"scale"},{default:l(()=>[o(V,null,{default:l(()=>[o($,{class:"row items-center",style:{width:"250px"}},{default:l(()=>[U("div",x,[o(_,{ref:"inputOperationNameRef",outlined:"",modelValue:e.operationName,"onUpdate:modelValue":t[0]||(t[0]=a=>e.operationName=a),label:"Operation name",class:"col",rules:[a=>a.length>2||"Please use minimum 3 characters"],onKeyup:A(e.saveOperation,["enter"])},null,8,["modelValue","rules","onKeyup"])]),o(G,{outlined:"",class:"q-mt-sm full-width",modelValue:e.category,"onUpdate:modelValue":t[1]||(t[1]=a=>e.category=a),options:e.categories,label:"Category","use-input":"","input-debounce":"0",onFilter:e.filterFn,style:{width:"250px"}},null,8,["modelValue","options","onFilter"])]),_:1}),o(w,{align:"right"},{default:l(()=>[D(o(g,{flat:"",label:"Cancel",color:"primary"},null,512),[[b]]),o(g,{flat:"",label:"Save Operation",color:"primary",onClick:e.saveOperation},null,8,["onClick"])]),_:1})]),_:1})]),_:1},8,["modelValue"]),o(h,{modelValue:e.addCategoryDialogOpened,"onUpdate:modelValue":t[4]||(t[4]=a=>e.addCategoryDialogOpened=a),persistent:"","transition-show":"scale","transition-hide":"scale"},{default:l(()=>[o(V,null,{default:l(()=>[o($,{class:"row items-center",style:{width:"250px"}},{default:l(()=>[o(_,{ref:"inputCategoryRef",outlined:"",modelValue:e.categoryName,"onUpdate:modelValue":t[3]||(t[3]=a=>e.categoryName=a),label:"Gategory name",class:"col",rules:[a=>a.length>2||"Please use minimum 3 characters"],onKeyup:A(e.saveCategory,["enter"])},null,8,["modelValue","rules","onKeyup"])]),_:1}),o(w,{align:"right"},{default:l(()=>[D(o(g,{flat:"",label:"Cancel",color:"primary"},null,512),[[b]]),o(g,{flat:"",label:"Save gategory",color:"primary",onClick:e.saveCategory},null,8,["onClick"])]),_:1})]),_:1})]),_:1},8,["modelValue"])])}var ae=k(W,[["render",ee]]);const oe=[{name:"label",required:!0,label:"Label",align:"left",field:e=>e.label,sortable:!0},{name:"category",label:"Category",align:"left",field:e=>e.category},{name:"delete",label:"Delete",align:"center",field:"delete"}],te=P({name:"OperationsTableComponent",setup(){const e=i(!1),t=i(),s=F(),u=()=>{s.storageOperations()},p=r=>{t.value=r,e.value=!0},d=()=>{t.value&&s.removeOperation(t.value),e.value=!1},a=i({sortBy:"date",descending:!0,page:1,rowsPerPage:f.getItem("operationsRowsPerPage")||5});return R(()=>{var r;f.set("operationsRowsPerPage",(r=a.value)==null?void 0:r.rowsPerPage)}),{confirmDeleteDialogOpened:e,operationsStore:s,columns:oe,changedHide:u,operationToRemove:t,deleteOperation:p,deleteOperationConfirmed:d,initialPagination:a}}}),le={class:"q-pa-md full-width"},ne=m(" Do you really want to delete Operation "),re=U("br",null,null,-1);function ie(e,t,s,u,p,d){return Q(),B("div",le,[o(Y,{title:"Operations",rows:e.operationsStore.getOperations,columns:e.columns,"row-key":"value",pagination:e.initialPagination,"onUpdate:pagination":t[0]||(t[0]=a=>e.initialPagination=a),"no-data-label":"No Operations found"},{body:l(a=>[o(J,{props:a},{default:l(()=>[o(y,{key:"label",props:a},{default:l(()=>[m(O(a.row.label),1)]),_:2},1032,["props"]),o(y,{key:"category",props:a},{default:l(()=>[m(O(a.row.category),1)]),_:2},1032,["props"]),o(y,{key:"delete",props:a},{default:l(()=>[o(g,{flat:"",round:"",color:"negative",icon:"delete",onClick:r=>e.deleteOperation(a.row)},null,8,["onClick"])]),_:2},1032,["props"])]),_:2},1032,["props"])]),_:1},8,["rows","columns","pagination"]),o(h,{modelValue:e.confirmDeleteDialogOpened,"onUpdate:modelValue":t[1]||(t[1]=a=>e.confirmDeleteDialogOpened=a),"transition-show":"scale","transition-hide":"scale"},{default:l(()=>[o(V,{class:"bg-negative text-white"},{default:l(()=>[o($,{class:"row text-center text-h6"},{default:l(()=>{var a;return[ne,re,m('"'+O((a=e.operationToRemove)==null?void 0:a.label)+'"? ',1)]}),_:1}),o(w,{align:"right",class:"bg-white"},{default:l(()=>[D(o(g,{flat:"",label:"No",color:"secondary"},null,512),[[b]]),o(g,{flat:"",label:"Yes",color:"negative",onClick:e.deleteOperationConfirmed},null,8,["onClick"])]),_:1})]),_:1})]),_:1},8,["modelValue"])])}var se=k(te,[["render",ie]]);const de=P({name:"OperationsPage",components:{OperationAddingComponent:ae,OperationsTableComponent:se},setup(){return{}}});function ue(e,t,s,u,p,d){const a=T("OperationAddingComponent"),r=T("OperationsTableComponent");return Q(),z(H,{class:"col full-width"},{default:l(()=>[o(a,{class:"q-mt-md"}),o(r)]),_:1})}var $e=k(de,[["render",ue]]);export{$e as default};
