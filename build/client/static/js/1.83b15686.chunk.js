(this.webpackJsonptemp=this.webpackJsonptemp||[]).push([[1],{892:function(e,n,r){"use strict";var t=r(10),a=r(138),i=r(0),o=r.n(i),c=r(220),s=r(72),l=r(238),d=r(6),u=r(41),m=r(279),f=r(216),h=r(425),v=r(426);var p=r(278),g=r(283),b=r(282),I=r(277),w=r(325),E=r(843);function y(e){var n=e.value,r=e.onChange,t=e.required,a=e.haveNone,i=e.items,c=e.helperText,s=e.id,l=e.label,d=e.name,u=e.fullWidth,m=e.FormControlProps,f=e.SelectProps,h=e.InputProps,v=e.onValid,y=e.onError,P=e.disabled;return!t||void 0!==n&&""!==n||y&&y(n),o.a.createElement(p.a,Object.assign({required:t,fullWidth:u},m),l&&o.a.createElement(g.a,{htmlFor:s},l),o.a.createElement(b.a,Object.assign({},f,{value:void 0===n||null===n?"":n,autoWidth:!0,onChange:function(e){r&&r(e),v&&v(e)},name:d,input:o.a.createElement(I.a,Object.assign({},h,{name:d,id:s})),disabled:P}),a&&o.a.createElement(w.a,{value:""},o.a.createElement("em",null,"None")),i.map((function(e,n){return o.a.createElement(w.a,{value:e.value,key:e.value},e.label)}))),c&&o.a.createElement(E.a,null,c))}y.defaultProps={required:!1,haveNone:!1,items:[],fullWidth:!1};var P=r(458),x=r(233),O=r(14),C=r.n(O);var j={chip:{backgroundColor:x.a[500],color:"white"}},k=Object(d.a)(j)((function(e){var n=e.label,r=e.classes,t=e.className;return o.a.createElement(P.a,{label:n,className:C()(r.chip,t)})})),N=r(459),R=r(929),T=r(444),W=r(445);function S(e){var n=e.value,r=e.min,t=e.max,a=e.step,c=e.others,l=e.onChange,d=e.id,m=e.label,h=e.classes,v=e.showTooltip,p=e.showButtons,g=e.disabled,b=Object(i.useState)([]),I=Object(u.a)(b,2),w=I[0],E=I[1],y=function(e){return function(){var r,t,i=n;r=setTimeout((function(){t=setInterval((function(){l("add"===e?{target:{value:i+=a}}:{target:{value:i-=a}})}),100),E([r,t])}),500),E([r,t])}},P=function(){clearTimeout(w[0]),clearInterval(w[1])},x=o.a.createElement(f.a,{onClick:function(){l({target:{value:n-a}})},onTouchStart:y(),onMouseDown:y(),onTouchEnd:P,onMouseUp:P,disabled:g},o.a.createElement(T.a,null)),O=o.a.createElement(f.a,{onClick:function(){l({target:{value:n+a}})},onMouseDown:y("add"),onTouchStart:y("add"),onTouchEnd:P,onMouseUp:P,disabled:g},o.a.createElement(W.a,null));return o.a.createElement("div",{className:h.root},v&&p?o.a.createElement(N.a,{title:n||0,"aria-label":"Value"},x):x,o.a.createElement("div",{className:h.slider},m&&o.a.createElement(s.a,{id:d,className:h.label},m),o.a.createElement(R.a,Object.assign({value:n||0,min:r,max:t,step:a,onChange:function(e,n){l({target:{value:n}})}},c,{disabled:g}))),v&&p?o.a.createElement(N.a,{title:n||0,"aria-label":"Value"},O):O)}S.defaultProps={step:1,showTooltip:!1,showButtons:!0};var A=Object(d.a)((function(e){return{root:{display:"flex",overflowX:"hidden",minHeight:"60px"},slider:{flexGrow:1},label:{marginBottom:"3px"},sliderButton:{color:e.palette.primary.main}}}))(S),F=r(37),U=r.n(F),D=r(248);var M=function(e){var n,r=e.value,t=e.id,a=e.onChange,i=e.label,c=e.error,s=e.disabled,l=e.fullWidth;try{n=U()(r,"X")}catch(d){n=U()()}return o.a.createElement(D.a,{value:n.toDate(),onChange:function(e){a({target:{value:U()(e).unix()}})},disabled:s,id:t,fullWidth:l,error:c,label:i,showTodayButton:!0})},q=r(100),L=r(136),B=r(76);function G(e){var n=e.classes,r=e.onChange,t=e.id,a=e.label,i=e.required,c=e.InputProps,l=e.error,d=e.value,u=e.disabled,m=e.icon,f=null;d&&(f="string"===typeof d?d:URL.createObjectURL(d));var h=B[m];return o.a.createElement("div",{className:n.root},o.a.createElement("input",Object.assign({accept:"image/*",className:n.input,id:t,type:"file",onChange:function(e){return r&&r(e)},required:i},c,{disabled:u})),o.a.createElement("label",{htmlFor:t,className:n.label},o.a.createElement(L.a,{className:n.preview},f?o.a.createElement("img",{src:f,alt:"Upload",className:n.uploaded}):o.a.createElement(h,{className:n.icon})),!u&&o.a.createElement(s.a,{variant:"caption",color:l?"error":void 0},"".concat(a).concat(i?"*":""))))}G.defaultProps={icon:"CloudUpload"};var V=Object(d.a)((function(e){return{input:{display:"none"},label:{display:"inline-flex",flexDirection:"column",alignItems:"center",width:function(e){return e.fullWidth&&"100%"}},preview:{display:"inline-flex",borderRadius:"1000px",width:function(e){var n=e.main;return"".concat(n?144:48,"px")},height:function(e){var n=e.main;return"".concat(n?144:48,"px")},justifyContent:"center",alignItems:"center",marginRight:e.spacing(1),margin:function(e){return e.fullWidth&&"auto"}},icon:{width:function(e){var n=e.main;return"".concat(n?90:30,"px")},height:function(e){var n=e.main;return"".concat(n?90:30,"px")}},uploaded:{clipPath:function(e){var n=e.main;return"circle(".concat(n?69:23,"px at center)")},height:"100%"},button:{padding:e.spacing(3),margin:e.spacing(3)}}}))(G),H=r(64),K=r(36),X=Object(H.a)((function(e){return{root:{display:"flex",flexWrap:"wrap"},formControl:{margin:e.spacing(1),minWidth:120,maxWidth:300},chips:{display:"flex",flexWrap:"wrap"},chip:{margin:2},noLabel:{marginTop:e.spacing(3)}}})),_={PaperProps:{style:{maxHeight:224,width:250}}};function J(e,n,r){return{fontWeight:-1===n.indexOf(e)?r.typography.fontWeightRegular:r.typography.fontWeightMedium}}function Y(e){var n=e.value,r=e.onChange,t=e.required,a=e.haveNone,i=e.items,c=e.helperText,s=e.id,l=e.label,d=e.name,u=e.fullWidth,m=e.FormControlProps,f=e.SelectProps,h=e.InputProps,v=e.onError,y=e.disabled,x=X(),O=Object(K.a)();return!t||void 0!==n&&""!==n||v&&v(n),o.a.createElement(p.a,Object.assign({required:t,fullWidth:u},m),l&&o.a.createElement(g.a,{htmlFor:s},l),o.a.createElement(b.a,Object.assign({multiple:!0},f,{value:n||[],autoWidth:!0,onChange:function(e){r&&r(e)},name:d,input:o.a.createElement(I.a,Object.assign({},h,{name:d,id:s})),disabled:y,renderValue:function(e){return o.a.createElement("div",{className:x.chips},i.reduce((function(n,r){return e.indexOf(r.value)>=0&&n.push(o.a.createElement(P.a,{key:r.value,label:r.label,className:x.chip})),n}),[]))},MenuProps:_}),a&&o.a.createElement(w.a,{value:""},o.a.createElement("em",null,"None")),i.map((function(e){return o.a.createElement(w.a,{value:e.value,key:e.value,style:J(e.value,n,O)},e.label)}))),c&&o.a.createElement(E.a,null,c))}Y.defaultProps={required:!1,haveNone:!1,items:[],fullWidth:!1},r.d(n,"a",(function(){return z}));var z={PASSWORD:function(e){var n=e.value,r=e.onChange,t=e.error,a=e.required,s=e.label,l=e.id,d=e.fullWidth,p=Object(i.useState)(!1),g=Object(u.a)(p,2),b=g[0],I=g[1];return o.a.createElement(c.a,{id:l,onChange:r,value:n,error:t,label:s,required:a,fullWidth:d,InputProps:{endAdornment:o.a.createElement(m.a,{position:"end"},o.a.createElement(f.a,{"aria-label":"Toggle password visibility",onClick:function(){I(!b)}},b?o.a.createElement(h.a,null):o.a.createElement(v.a,null)))},type:b?"text":"password"})},TEXT:c.a,SELECT:y,SLIDER:A,DATE_TIME_PICKER:M,IMAGE:V,MULTI:Y};function Q(e){var n=e.fields,r=e.classes,c=e.errorNotes,d=e.title,u=e.values,m=e.onChange,f=e.exclude,h=e.children,v=e.footer,p=e.onError,g=e.errors,b=e.readOnly,I=e.hints,w=e.onChangeEvent,E=e.gridContainerProps,y=e.wrapper,P=function(e,n){var r=n.persistEvent,i=n.passEvent;return function(n){r&&n.persist(),n&&n.target&&void 0!==n.target.value?(m&&m(Object(a.a)({},u,Object(t.a)({},e,i?n:n.target.value))),w&&w(Object(a.a)({},u,Object(t.a)({},e,i?n:n.target.value)),e,n)):m&&m(Object(a.a)({},u,Object(t.a)({},e,n)))}},x=n.filter((function(e){return!f.includes(e.name)}));Object(i.useEffect)((function(){var e={},n=!0,r=!1,t=void 0;try{for(var a,i=x[Symbol.iterator]();!(n=(a=i.next()).done);n=!0){var o=a.value;if(o.validators){var c=q.a.runThroughValidators(o.validators,u[o.name]).map((function(e){return e.error}));e[o.name]=c}}}catch(s){r=!0,t=s}finally{try{n||null==i.return||i.return()}finally{if(r)throw t}}p&&p(e)}),[u]);var O=y;return o.a.createElement(O,{className:r.root},c.map((function(e,n){return o.a.createElement(k,{key:n,label:e,className:r.errorChip})})),d&&o.a.createElement(s.a,{variant:"h6",gutterBottom:!0,component:"h1",className:r.title},d),o.a.createElement(l.a,Object.assign({container:!0,spacing:3,className:r.gridContainer},E),x.map((function(e){var n,r=e.type,t=e.props,a=void 0===t?{}:t,i=e.name,c=e.id,s=e.GridProps,d=e.persistEvent;return b.length?n=!!b.find((function(e){return e===i||e===c})):"boolean"===typeof b&&(n=b),o.a.createElement(l.a,Object.assign({item:!0,xs:12,sm:6,key:i},s),o.a.createElement(r,Object.assign({id:c,value:void 0===u[i]?"":u[i],onChange:P(i,{persistEvent:d}),disabled:n},a,{label:g[i]&&g[i][0]&&u[i]?g[i][0]:a.label,error:!(!g[i]||!g[i].length||void 0===u[i]),fullWidth:!0})))})),h,(I||v)&&o.a.createElement(l.a,{item:!0,xs:12},I&&o.a.createElement(l.a,{item:!0,className:r.hints},o.a.createElement(s.a,null,I)),v)))}Q.defaultProps={fields:[],exclude:[],values:{},errors:{},errorNotes:[],buttonLabel:"Confirm",readOnly:!1,hints:"*Required",wrapper:"form"};n.b=Object(d.a)((function(e){return{root:{padding:e.spacing(1),overflow:"visible"},hints:{float:"right"},title:{marginBottom:e.spacing(3)},gridContainer:{overflow:"visible"},errorChip:{margin:"".concat(e.spacing(1),"px 0 ").concat(e.spacing(1),"px 0")}}}))(Q)},893:function(e,n,r){"use strict";r.d(n,"a",(function(){return c}));var t=r(0),a=r.n(t),i=r(75),o=r(290);r.d(n,"b",(function(){return o.a}));var c=Object(i.b)((function(e){var n=e.auth;return{role:n&&n.data&&n.data.role||void 0}}))((function(e){var n=e.roles,r=e.children,t=e.role,i=e.excludes;return t&&(n&&n.includes(t)||i&&!i.includes(t))?a.a.createElement(a.a.Fragment,null,r):null}))},895:function(e,n,r){"use strict";var t=r(48),a=r(12),i=r.n(a),o=r(22),c=r(21),s=function(){function e(n){Object(o.a)(this,e),this.name=void 0,this.roles=void 0,this.name=n,this.roles=[]}return Object(c.a)(e,[{key:"addRole",value:function(e){if(this.roles.find((function(n){return n.name===e.name})))throw new Error("Role already exists");this.roles.push(e)}},{key:"can",value:function(e,n,r,t){var a=this;return new Promise((function(o){var c,s;return i.a.async((function(d){for(;;)switch(d.prev=d.next){case 0:if(c=a.roles.find((function(n){return e instanceof l?e.name===n.name:e===n.name}))){d.next=3;break}throw new Error("Role does not exist.");case 3:return d.next=5,i.a.awrap(c.can(n,r,t));case 5:s=d.sent,o(s);case 7:case"end":return d.stop()}}))}))}},{key:"getExcludedFields",value:function(e,n,r){var a=this.roles.find((function(n){return n.name===e}));if(a){var i=[];if(a.extends){var o=!0,c=!1,s=void 0;try{for(var l,d=a.extends[Symbol.iterator]();!(o=(l=d.next()).done);o=!0){var u=l.value.actions.find((function(e){return e.name===n&&e.resource.name===r}));u&&i.push.apply(i,Object(t.a)(u.excludedFields))}}catch(f){c=!0,s=f}finally{try{o||null==d.return||d.return()}finally{if(c)throw s}}}var m=a.actions.find((function(e){return e.name===n&&e.resource.name===r}));return m&&i.push.apply(i,Object(t.a)(m.excludedFields)),i}throw new Error("Role does not exist.")}},{key:"toObject",value:function(){return{name:this.name,roles:this.roles.map((function(e){return{name:e.name,access:e.actions.reduce((function(e,n){return e.resources[n.resource.name]||(e.resources[n.resource.name]={permissions:{}}),e.resources[n.resource.name].permissions[n.name]={conditional:!!n.condition,excludedFields:n.excludedFields},e}),{resources:{}}),extends:e.extends.map((function(e){return e.name}))}}))}}}]),e}(),l=function(){function e(n){Object(o.a)(this,e),this.name=void 0,this.actions=void 0,this.extends=void 0,this.name=n,this.actions=[],this.extends=[]}return Object(c.a)(e,[{key:"addPermission",value:function(e){if(this.actions.find((function(n){return n.name===e.name&&n.resource.name===e.resource.name})))throw new Error("Action already exists.");this.actions.push(e)}},{key:"extend",value:function(e){this.extends.push(e)}},{key:"can",value:function(e,n,r){var t=this;return new Promise((function(a){var o,c,s,l,d,m,f,h;return i.a.async((function(v){for(;;)switch(v.prev=v.next){case 0:o=t.actions,c=n instanceof u?n.name:n,s=0;case 3:if(!(s<o.length)){v.next=21;break}if(l=o[s],e!==l.name||l.resource.name!==c){v.next=18;break}return d=void 0,v.prev=7,v.next=10,i.a.awrap(l.perform(r));case 10:d=v.sent,v.next=16;break;case 13:v.prev=13,v.t0=v.catch(7),d=!1;case 16:if(!d){v.next=18;break}return v.abrupt("return",a(d));case 18:s++,v.next=3;break;case 21:if(!t.extends){v.next=33;break}m=0;case 23:if(!(m<t.extends.length)){v.next=33;break}return f=t.extends[m],v.next=27,i.a.awrap(f.can(e,n,r));case 27:if(!(h=v.sent)){v.next=30;break}return v.abrupt("return",a(h));case 30:m++,v.next=23;break;case 33:return v.abrupt("return",a(!1));case 34:case"end":return v.stop()}}),null,null,[[7,13]])}))}}]),e}(),d=function(){function e(n,r,t){var a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:[];Object(o.a)(this,e),this.name=void 0,this.resource=void 0,this.condition=void 0,this.excludedFields=void 0,this.name=n,this.resource=r,this.condition=t,this.excludedFields=a}return Object(c.a)(e,[{key:"perform",value:function(e){return!this.condition||this.condition(e)}}]),e}(),u=function e(n){Object(o.a)(this,e),this.name=void 0,this.name=n},m=s,f=r(23),h=f.Operation,v=h.READ,p=h.UPDATE,g=h.DELETE,b=h.CREATE,I=new m("Car Booking"),w=new l(f.Role.MASTER),E=new l(f.Role.ADMIN),y=new l(f.Role.KEY_MANAGER),P=new l(f.Role.GUEST),x=new u(f.Resource.VEHICLES),O=new u(f.Resource.LOCATIONS),C=new u(f.Resource.BOOKINGS),j=new u(f.Resource.USERS),k=new u(f.Resource.ACCIDENTS),N=new u(f.Resource.CATEGORIES),R=new u(f.Resource.CLIENTS);P.addPermission(new d(b,C,(function(e){var n=e.accessor,r=e.body;try{return void 0!==n.id&&n.id===r.userId}catch(t){return console.error(t),!1}}),["userId","paid","clientId"])),P.addPermission(new d(b,k,(function(e){var n=e.accessor,r=e.body;try{return void 0!==n.id&&n.id===r.userId}catch(t){return console.error(t),!1}}),["userId","bookingId","clientId"])),P.addPermission(new d(v,C,(function(e){var n=e.accessor,r=e.target;try{return!(!n.id||n.id!==r.userId)}catch(t){return console.error(t),!1}}))),P.addPermission(new d(v,x,(function(e){var n=e.accessor,r=e.target;try{return!(!n.clientId||n.clientId!==r.clientId)}catch(t){return console.error(t),!1}}),["bookingChargeUnitId","bookingChargeCount","bookingCharge"])),P.addPermission(new d(v,O,(function(e){var n=e.accessor,r=e.target;try{return!(!n.clientId||!r.clients.find((function(e){return e.id===n.clientId})))}catch(t){return console.error(t),!1}}),["clientId"])),P.addPermission(new d(v,N,(function(e){var n=e.accessor,r=e.target;try{return!(!n.clientId||n.clientId!==r.clientId)}catch(t){return console.error(t),!1}}),["clientId"])),P.addPermission(new d(p,C,(function(e){var n=e.accessor,r=e.target;try{return n.id===r.userId&&!1===r.approved}catch(t){return console.error(t),!1}}))),P.addPermission(new d(g,C,(function(e){var n=e.accessor,r=e.target;try{return n.id===r.userId&&!1===r.approved}catch(t){return console.error(t),!1}}))),y.addPermission(new d(v,C,(function(e){var n=e.accessor,r=e.target;try{return!(!n.clientId||n.clientId!==r.user.clientId)}catch(t){return console.error(t),!1}}))),y.addPermission(new d(v,j,(function(e){var n=e.accessor,r=e.target;try{return!(!n.clientId||n.clientId!==r.clientId)}catch(t){return console.error(t),!1}}))),y.addPermission(new d(v,x,(function(e){var n=e.accessor,r=e.target;try{return!(!n.clientId||n.clientId!==r.clientId)}catch(t){return console.error(t),!1}}))),y.addPermission(new d(v,k,(function(e){var n=e.accessor,r=e.target;try{return!(!n.clientId||n.clientId!==r.clientId)}catch(t){return console.error(t),!1}}))),y.addPermission(new d(v,O,(function(e){var n=e.accessor,r=e.target;try{return!(!n.clientId||!r.clients.find((function(e){return e.id===n.clientId})))}catch(t){return console.error(t),!1}}))),y.addPermission(new d(v,N,(function(e){var n=e.accessor,r=e.target;try{return!(!n.clientId||n.clientId!==r.clientId)}catch(t){return console.error(t),!1}}))),y.addPermission(new d(p,x,(function(e){var n=e.accessor,r=e.target;try{return!(!n.clientId||n.clientId!==r.clientId)}catch(t){return console.error(t),!1}}),["categories","objectId","plateNumber","vin","wialonUnitId"])),y.addPermission(new d(p,C,(function(e){var n=e.accessor,r=e.target;try{return!(!n.clientId||n.clientId!==r.user.clientId)}catch(t){return console.error(t),!1}}))),y.addPermission(new d(p,k,(function(e){var n=e.accessor,r=e.target;try{return!(!n.clientId||n.clientId!==r.clientId)}catch(t){return console.error(t),!1}}))),y.addPermission(new d(g,k,(function(e){var n=e.accessor,r=e.target;try{return!(!n.clientId||n.clientId!==r.clientId||!1!==r.approved)}catch(t){return console.error(t),!1}}))),E.addPermission(new d(b,j,(function(e){var n=e.accessor,r=e.target;try{return!(!n.clientId||n.clientId!==r.clientId)}catch(t){return console.error(t),!1}}))),E.addPermission(new d(b,N,(function(e){var n=e.accessor,r=e.target;try{return!(!n.clientId||n.clientId!==r.clientId)}catch(t){return console.error(t),!1}}))),E.addPermission(new d(v,C,(function(e){var n=e.accessor,r=e.target;try{return!(!n.clientId||n.clientId!==r.user.clientId)}catch(t){return console.error(t),!1}}))),E.addPermission(new d(p,C,(function(e){var n=e.accessor,r=e.target;try{return!(!n.clientId||n.clientId!==r.user.clientId)}catch(t){return console.error(t),!1}}))),E.addPermission(new d(v,O,(function(e){var n=e.accessor,r=e.target;try{return!(!n.clientId||!r.clients.find((function(e){return e.id===n.clientId})))}catch(t){return console.error(t),!1}}))),E.addPermission(new d(v,j,(function(e){var n=e.accessor,r=e.target;try{return!(!n.clientId||n.clientId!==r.clientId)}catch(t){return console.error(t),!1}}))),E.addPermission(new d(v,x,(function(e){var n=e.accessor,r=e.target;try{return!(!n.clientId||n.clientId!==r.clientId)}catch(t){return console.error(t),!1}}))),E.addPermission(new d(v,k,(function(e){var n=e.accessor,r=e.target;try{return!(!n.clientId||n.clientId!==r.clientId)}catch(t){return console.error(t),!1}}))),E.addPermission(new d(v,N,(function(e){var n=e.accessor,r=e.target;try{return!(!n.clientId||n.clientId!==r.clientId)}catch(t){return console.error(t),!1}}))),E.addPermission(new d(p,j,(function(e){var n=e.accessor,r=e.target;try{return!(!n.clientId||n.clientId!==r.clientId)}catch(t){return console.error(t),!1}}))),E.addPermission(new d(p,x,(function(e){var n=e.accessor,r=e.target;try{return!(!n.clientId||n.clientId!==r.clientId)}catch(t){return console.error(t),!1}}),["objectId","plateNumber","vin","wialonUnitId"])),E.addPermission(new d(p,k,(function(e){var n=e.accessor,r=e.target;try{return!(!n.clientId||n.clientId!==r.clientId)}catch(t){return console.error(t),!1}}))),E.addPermission(new d(p,N,(function(e){var n=e.accessor,r=e.target;try{return!(!n.clientId||n.clientId!==r.clientId)}catch(t){return console.error(t),!1}}))),E.addPermission(new d(g,N,(function(e){var n=e.accessor,r=e.target;try{return!(!n.clientId||n.clientId!==r.clientId)}catch(t){return console.error(t),!1}}))),E.addPermission(new d(g,C,(function(e){var n=e.accessor,r=e.target;try{return!(!n.clientId||n.clientId!==r.user.clientId||!1!==r.approved)}catch(t){return console.error(t),!1}}))),w.addPermission(new d(b,j)),w.addPermission(new d(b,x)),w.addPermission(new d(b,R)),w.addPermission(new d(b,O)),w.addPermission(new d(b,N)),w.addPermission(new d(v,j)),w.addPermission(new d(v,x)),w.addPermission(new d(v,C)),w.addPermission(new d(v,R)),w.addPermission(new d(v,k)),w.addPermission(new d(v,O)),w.addPermission(new d(v,N)),w.addPermission(new d(p,j)),w.addPermission(new d(p,x)),w.addPermission(new d(p,C)),w.addPermission(new d(p,R)),w.addPermission(new d(p,k)),w.addPermission(new d(p,O)),w.addPermission(new d(p,N)),w.addPermission(new d(g,j)),w.addPermission(new d(g,x)),w.addPermission(new d(g,C,(function(e){e.accessor;var n=e.target;try{return!1===n.approved}catch(r){return console.error(r),!1}}))),w.addPermission(new d(g,R)),w.addPermission(new d(g,k)),w.addPermission(new d(g,O)),w.addPermission(new d(g,N)),I.addRole(w),I.addRole(E),I.addRole(y),I.addRole(P);n.a=I}}]);
//# sourceMappingURL=1.83b15686.chunk.js.map