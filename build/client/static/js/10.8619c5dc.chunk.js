(this.webpackJsonptemp=this.webpackJsonptemp||[]).push([[10],{892:function(e,a,t){"use strict";var r=t(10),n=t(138),o=t(0),l=t.n(o),i=t(220),s=t(72),c=t(238),u=t(6),d=t(41),m=t(279),p=t(216),f=t(425),b=t(426);var v=t(278),h=t(283),g=t(282),E=t(277),O=t(325),w=t(843);function j(e){var a=e.value,t=e.onChange,r=e.required,n=e.haveNone,o=e.items,i=e.helperText,s=e.id,c=e.label,u=e.name,d=e.fullWidth,m=e.FormControlProps,p=e.SelectProps,f=e.InputProps,b=e.onValid,j=e.onError,y=e.disabled;return!r||void 0!==a&&""!==a||j&&j(a),l.a.createElement(v.a,Object.assign({required:r,fullWidth:d},m),c&&l.a.createElement(h.a,{htmlFor:s},c),l.a.createElement(g.a,Object.assign({},p,{value:void 0===a||null===a?"":a,autoWidth:!0,onChange:function(e){t&&t(e),b&&b(e)},name:u,input:l.a.createElement(E.a,Object.assign({},f,{name:u,id:s})),disabled:y}),n&&l.a.createElement(O.a,{value:""},l.a.createElement("em",null,"None")),o.map((function(e,a){return l.a.createElement(O.a,{value:e.value,key:e.value},e.label)}))),i&&l.a.createElement(w.a,null,i))}j.defaultProps={required:!1,haveNone:!1,items:[],fullWidth:!1};var y=t(458),C=t(233),x=t(14),N=t.n(x);var P={chip:{backgroundColor:C.a[500],color:"white"}},W=Object(u.a)(P)((function(e){var a=e.label,t=e.classes,r=e.className;return l.a.createElement(y.a,{label:a,className:N()(t.chip,r)})})),S=t(459),T=t(929),k=t(444),D=t(445);function q(e){var a=e.value,t=e.min,r=e.max,n=e.step,i=e.others,c=e.onChange,u=e.id,m=e.label,f=e.classes,b=e.showTooltip,v=e.showButtons,h=e.disabled,g=Object(o.useState)([]),E=Object(d.a)(g,2),O=E[0],w=E[1],j=function(e){return function(){var t,r,o=a;t=setTimeout((function(){r=setInterval((function(){c("add"===e?{target:{value:o+=n}}:{target:{value:o-=n}})}),100),w([t,r])}),500),w([t,r])}},y=function(){clearTimeout(O[0]),clearInterval(O[1])},C=l.a.createElement(p.a,{onClick:function(){c({target:{value:a-n}})},onTouchStart:j(),onMouseDown:j(),onTouchEnd:y,onMouseUp:y,disabled:h},l.a.createElement(k.a,null)),x=l.a.createElement(p.a,{onClick:function(){c({target:{value:a+n}})},onMouseDown:j("add"),onTouchStart:j("add"),onTouchEnd:y,onMouseUp:y,disabled:h},l.a.createElement(D.a,null));return l.a.createElement("div",{className:f.root},b&&v?l.a.createElement(S.a,{title:a||0,"aria-label":"Value"},C):C,l.a.createElement("div",{className:f.slider},m&&l.a.createElement(s.a,{id:u,className:f.label},m),l.a.createElement(T.a,Object.assign({value:a||0,min:t,max:r,step:n,onChange:function(e,a){c({target:{value:a}})}},i,{disabled:h}))),b&&v?l.a.createElement(S.a,{title:a||0,"aria-label":"Value"},x):x)}q.defaultProps={step:1,showTooltip:!1,showButtons:!0};var L=Object(u.a)((function(e){return{root:{display:"flex",overflowX:"hidden",minHeight:"60px"},slider:{flexGrow:1},label:{marginBottom:"3px"},sliderButton:{color:e.palette.primary.main}}}))(q),R=t(37),I=t.n(R),B=t(248);var V=function(e){var a,t=e.value,r=e.id,n=e.onChange,o=e.label,i=e.error,s=e.disabled,c=e.fullWidth;try{a=I()(t,"X")}catch(u){a=I()()}return l.a.createElement(B.a,{value:a.toDate(),onChange:function(e){n({target:{value:I()(e).unix()}})},disabled:s,id:r,fullWidth:c,error:i,label:o,showTodayButton:!0})},A=t(100),F=t(136),M=t(76);function U(e){var a=e.classes,t=e.onChange,r=e.id,n=e.label,o=e.required,i=e.InputProps,c=e.error,u=e.value,d=e.disabled,m=e.icon,p=null;u&&(p="string"===typeof u?u:URL.createObjectURL(u));var f=M[m];return l.a.createElement("div",{className:a.root},l.a.createElement("input",Object.assign({accept:"image/*",className:a.input,id:r,type:"file",onChange:function(e){return t&&t(e)},required:o},i,{disabled:d})),l.a.createElement("label",{htmlFor:r,className:a.label},l.a.createElement(F.a,{className:a.preview},p?l.a.createElement("img",{src:p,alt:"Upload",className:a.uploaded}):l.a.createElement(f,{className:a.icon})),!d&&l.a.createElement(s.a,{variant:"caption",color:c?"error":void 0},"".concat(n).concat(o?"*":""))))}U.defaultProps={icon:"CloudUpload"};var G=Object(u.a)((function(e){return{input:{display:"none"},label:{display:"inline-flex",flexDirection:"column",alignItems:"center",width:function(e){return e.fullWidth&&"100%"}},preview:{display:"inline-flex",borderRadius:"1000px",width:function(e){var a=e.main;return"".concat(a?144:48,"px")},height:function(e){var a=e.main;return"".concat(a?144:48,"px")},justifyContent:"center",alignItems:"center",marginRight:e.spacing(1),margin:function(e){return e.fullWidth&&"auto"}},icon:{width:function(e){var a=e.main;return"".concat(a?90:30,"px")},height:function(e){var a=e.main;return"".concat(a?90:30,"px")}},uploaded:{clipPath:function(e){var a=e.main;return"circle(".concat(a?69:23,"px at center)")},height:"100%"},button:{padding:e.spacing(3),margin:e.spacing(3)}}}))(U),X=t(64),H=t(36),z=Object(X.a)((function(e){return{root:{display:"flex",flexWrap:"wrap"},formControl:{margin:e.spacing(1),minWidth:120,maxWidth:300},chips:{display:"flex",flexWrap:"wrap"},chip:{margin:2},noLabel:{marginTop:e.spacing(3)}}})),J={PaperProps:{style:{maxHeight:224,width:250}}};function K(e,a,t){return{fontWeight:-1===a.indexOf(e)?t.typography.fontWeightRegular:t.typography.fontWeightMedium}}function _(e){var a=e.value,t=e.onChange,r=e.required,n=e.haveNone,o=e.items,i=e.helperText,s=e.id,c=e.label,u=e.name,d=e.fullWidth,m=e.FormControlProps,p=e.SelectProps,f=e.InputProps,b=e.onError,j=e.disabled,C=z(),x=Object(H.a)();return!r||void 0!==a&&""!==a||b&&b(a),l.a.createElement(v.a,Object.assign({required:r,fullWidth:d},m),c&&l.a.createElement(h.a,{htmlFor:s},c),l.a.createElement(g.a,Object.assign({multiple:!0},p,{value:a||[],autoWidth:!0,onChange:function(e){t&&t(e)},name:u,input:l.a.createElement(E.a,Object.assign({},f,{name:u,id:s})),disabled:j,renderValue:function(e){return l.a.createElement("div",{className:C.chips},o.reduce((function(a,t){return e.indexOf(t.value)>=0&&a.push(l.a.createElement(y.a,{key:t.value,label:t.label,className:C.chip})),a}),[]))},MenuProps:J}),n&&l.a.createElement(O.a,{value:""},l.a.createElement("em",null,"None")),o.map((function(e){return l.a.createElement(O.a,{value:e.value,key:e.value,style:K(e.value,a,x)},e.label)}))),i&&l.a.createElement(w.a,null,i))}_.defaultProps={required:!1,haveNone:!1,items:[],fullWidth:!1},t.d(a,"a",(function(){return $}));var $={PASSWORD:function(e){var a=e.value,t=e.onChange,r=e.error,n=e.required,s=e.label,c=e.id,u=e.fullWidth,v=Object(o.useState)(!1),h=Object(d.a)(v,2),g=h[0],E=h[1];return l.a.createElement(i.a,{id:c,onChange:t,value:a,error:r,label:s,required:n,fullWidth:u,InputProps:{endAdornment:l.a.createElement(m.a,{position:"end"},l.a.createElement(p.a,{"aria-label":"Toggle password visibility",onClick:function(){E(!g)}},g?l.a.createElement(f.a,null):l.a.createElement(b.a,null)))},type:g?"text":"password"})},TEXT:i.a,SELECT:j,SLIDER:L,DATE_TIME_PICKER:V,IMAGE:G,MULTI:_};function Q(e){var a=e.fields,t=e.classes,i=e.errorNotes,u=e.title,d=e.values,m=e.onChange,p=e.exclude,f=e.children,b=e.footer,v=e.onError,h=e.errors,g=e.readOnly,E=e.hints,O=e.onChangeEvent,w=e.gridContainerProps,j=e.wrapper,y=function(e,a){var t=a.persistEvent,o=a.passEvent;return function(a){t&&a.persist(),a&&a.target&&void 0!==a.target.value?(m&&m(Object(n.a)({},d,Object(r.a)({},e,o?a:a.target.value))),O&&O(Object(n.a)({},d,Object(r.a)({},e,o?a:a.target.value)),e,a)):m&&m(Object(n.a)({},d,Object(r.a)({},e,a)))}},C=a.filter((function(e){return!p.includes(e.name)}));Object(o.useEffect)((function(){var e={},a=!0,t=!1,r=void 0;try{for(var n,o=C[Symbol.iterator]();!(a=(n=o.next()).done);a=!0){var l=n.value;if(l.validators){var i=A.a.runThroughValidators(l.validators,d[l.name]).map((function(e){return e.error}));e[l.name]=i}}}catch(s){t=!0,r=s}finally{try{a||null==o.return||o.return()}finally{if(t)throw r}}v&&v(e)}),[d]);var x=j;return l.a.createElement(x,{className:t.root},i.map((function(e,a){return l.a.createElement(W,{key:a,label:e,className:t.errorChip})})),u&&l.a.createElement(s.a,{variant:"h6",gutterBottom:!0,component:"h1",className:t.title},u),l.a.createElement(c.a,Object.assign({container:!0,spacing:3,className:t.gridContainer},w),C.map((function(e){var a,t=e.type,r=e.props,n=void 0===r?{}:r,o=e.name,i=e.id,s=e.GridProps,u=e.persistEvent;return g.length?a=!!g.find((function(e){return e===o||e===i})):"boolean"===typeof g&&(a=g),l.a.createElement(c.a,Object.assign({item:!0,xs:12,sm:6,key:o},s),l.a.createElement(t,Object.assign({id:i,value:void 0===d[o]?"":d[o],onChange:y(o,{persistEvent:u}),disabled:a},n,{label:h[o]&&h[o][0]&&d[o]?h[o][0]:n.label,error:!(!h[o]||!h[o].length||void 0===d[o]),fullWidth:!0})))})),f,(E||b)&&l.a.createElement(c.a,{item:!0,xs:12},E&&l.a.createElement(c.a,{item:!0,className:t.hints},l.a.createElement(s.a,null,E)),b)))}Q.defaultProps={fields:[],exclude:[],values:{},errors:{},errorNotes:[],buttonLabel:"Confirm",readOnly:!1,hints:"*Required",wrapper:"form"};a.b=Object(u.a)((function(e){return{root:{padding:e.spacing(1),overflow:"visible"},hints:{float:"right"},title:{marginBottom:e.spacing(3)},gridContainer:{overflow:"visible"},errorChip:{margin:"".concat(e.spacing(1),"px 0 ").concat(e.spacing(1),"px 0")}}}))(Q)},903:function(e,a,t){"use strict";var r=t(0),n=t.n(r),o=t(892),l=t(100),i=o.a.TEXT;a.a=function(e){var a=e.title,t=e.exclude,r=e.errorNotes,s=e.onChange,c=e.values,u=e.footer,d=e.onError,m=e.errors,p=[{type:i,name:"email",id:"email",validators:[l.l.email],props:{label:"Email Address",required:!0},GridProps:{xs:12,sm:12,md:12}}];return n.a.createElement(o.b,{title:a,fields:p,exclude:t,errorNotes:r,onChange:s,values:c,footer:u,onError:d,errors:m})}},904:function(e,a,t){"use strict";var r=t(0),n=t.n(r),o=t(892),l=t(100),i=o.a.PASSWORD;a.a=function(e){var a=e.title,t=e.exclude,r=e.errorNotes,s=e.errors,c=e.onValid,u=e.onChange,d=e.onError,m=e.values,p=e.buttonLabel,f=e.footer,b=new l.a((function(e){return e===m.password}),"Password does not match."),v=[{type:i,name:"password",id:"password",validators:[l.l.password],props:{label:"New Password",required:!0},GridProps:{sm:12}},{type:i,name:"passwordConfirm",id:"password-confirm",validators:[b],GridProps:{sm:12},props:{label:"Confirm New Password",required:!0}},{type:i,name:"passwordOld",id:"password-old",validators:[l.l.password],props:{label:"Old Password",required:!0},GridProps:{sm:12}}];return n.a.createElement(o.b,{title:a,fields:v,exclude:t,errorNotes:r,errors:s,onValid:c,onChange:u,onError:d,values:m,buttonLabel:p,footer:f})}},911:function(e,a,t){"use strict";var r=t(3),n=t(4),o=t(0),l=t.n(o),i=(t(2),t(5)),s=t(11),c=t(6),u=t(189),d=t(25),m=t(72),p=l.a.forwardRef((function(e,a){var t=e.classes,o=e.className,c=e.color,p=void 0===c?"primary":c,f=e.component,b=void 0===f?"a":f,v=e.onBlur,h=e.onFocus,g=e.TypographyClasses,E=e.underline,O=void 0===E?"hover":E,w=e.variant,j=void 0===w?"inherit":w,y=Object(n.a)(e,["classes","className","color","component","onBlur","onFocus","TypographyClasses","underline","variant"]),C=Object(u.a)(),x=C.isFocusVisible,N=C.onBlurVisible,P=C.ref,W=l.a.useState(!1),S=W[0],T=W[1],k=Object(d.a)(a,P);return l.a.createElement(m.a,Object(r.a)({className:Object(i.a)(t.root,t["underline".concat(Object(s.a)(O))],o,S&&t.focusVisible,{button:t.button}[b]),classes:g,color:p,component:b,onBlur:function(e){S&&(N(),T(!1)),v&&v(e)},onFocus:function(e){x(e)&&T(!0),h&&h(e)},ref:k,variant:j},y))}));a.a=Object(c.a)({root:{},underlineNone:{textDecoration:"none"},underlineHover:{textDecoration:"none","&:hover":{textDecoration:"underline"}},underlineAlways:{textDecoration:"underline"},button:{position:"relative",WebkitTapHighlightColor:"transparent",backgroundColor:"transparent",outline:0,border:0,margin:0,borderRadius:0,padding:0,cursor:"pointer",userSelect:"none",verticalAlign:"middle","-moz-appearance":"none","-webkit-appearance":"none","&::-moz-focus-inner":{borderStyle:"none"},"&$focusVisible":{outline:"auto"}},focusVisible:{}},{name:"MuiLink"})(p)},925:function(e,a,t){"use strict";t.r(a);var r=t(12),n=t.n(r),o=t(0),l=t.n(o),i=t(6),s=t(162),c=t(112),u=t(75),d=t(54),m=t(136),p=t(911),f=t(844),b=t(41),v=t(238),h=t(137),g=t(892),E=t(100),O=g.a.PASSWORD,w=g.a.TEXT;var j=function(e){var a=e.title,t=e.exclude,r=e.errorNotes,n=e.onChange,o=e.values,i=e.footer,s=e.onError,c=e.errors,u=[{type:w,name:"username",id:"username",validators:[E.l.username],props:{label:"Username",required:!0}},{type:O,name:"password",id:"password",validators:[E.l.password],props:{label:"Password",required:!0,type:"password"}}];return l.a.createElement(g.b,{title:a,fields:u,exclude:t,errorNotes:r,onChange:n,onError:s,values:o,footer:i,errors:c})},y=t(180);var C=Object(u.b)(null,y)((function(e){var a=e.authLogin,t=e.onLogin,r=Object(o.useState)({}),n=Object(b.a)(r,2),i=n[0],s=n[1],c=Object(o.useState)([]),u=Object(b.a)(c,2),d=u[0],m=u[1],p=Object(o.useState)(!1),f=Object(b.a)(p,2),g=f[0],O=f[1],w=Object(o.useState)({}),y=Object(b.a)(w,2),C=y[0],x=y[1];Object(o.useEffect)((function(){var e=!0;for(var a in C)C[a].length&&(e=!1);O(!e)}),[C]);var N=l.a.createElement(v.a,{item:!0},l.a.createElement(h.a,{fullWidth:!0,disabled:g,type:"submit",variant:"contained",color:"primary",onClick:function(e){e.preventDefault(),O(!0),a(i.username,i.password).then((function(){return t&&t()})).catch((function(e){O(!1),m([Object(E.c)(e).message])}))}},"Login"));return l.a.createElement(j,{values:i,onChange:s,onError:x,errors:C,title:"Login",footer:N,errorNotes:d})})),x=t(138),N=t(903),P=t(904),W=t(72);function S(e){var a=e.onSubmit,t=e.onExit,r=e.token,n=e.onPasswordReset,i=Object(o.useState)({}),s=Object(b.a)(i,2),c=s[0],u=s[1],d=Object(o.useState)([]),m=Object(b.a)(d,2),p=m[0],f=m[1],g=Object(o.useState)(!1),O=Object(b.a)(g,2),w=O[0],j=O[1],y=Object(o.useState)({}),C=Object(b.a)(y,2),S=C[0],T=C[1],k=Object(o.useState)(0),D=Object(b.a)(k,2),q=D[0],L=D[1];Object(o.useEffect)((function(){var e=!0;for(var a in S)S[a].length&&(e=!1);j(!e)}),[S]);return function(e){switch(e){case 0:return l.a.createElement(N.a,{value:c,title:"Enter your email.",values:c,onChange:u,errors:S,onError:T,footer:l.a.createElement(v.a,{item:!0},l.a.createElement(h.a,{fullWidth:!0,disabled:w,type:"submit",variant:"contained",color:"primary",onClick:function(t){t.preventDefault(),j(!0),E.b.resetPassword(c).then((function(){a&&a(),u({}),L(e+1)})).catch((function(e){j(!1),f([Object(E.c)(e).message])}))}},"Confirm")),errorNotes:p});case 1:return l.a.createElement("div",null,l.a.createElement(W.a,{gutterBottom:!0},"An email has been sent! Please follow the instructions within."),l.a.createElement(h.a,{fullWidth:!0,type:"submit",variant:"contained",color:"primary",onClick:function(e){return t&&t()}},"OK"));case 2:return l.a.createElement(P.a,{title:"Provide a new password",values:c,onChange:u,errorNotes:p,errors:S,onError:T,exclude:["passwordOld"],footer:l.a.createElement(v.a,{item:!0},l.a.createElement(h.a,{disabled:w,type:"submit",variant:"contained",color:"primary",onClick:function(e){e.preventDefault(),j(!0),E.b.resetPassword(Object(x.a)({},c,{token:r})).then((function(){u({}),n&&n()})).catch((function(e){f([Object(E.c)(e).message]),j(!1)}))}},"Confirm"))});default:return null}}(r?2:q)}a.default=Object(d.compose)(Object(u.b)(null,y),c.h,Object(i.a)((function(e){return{root:{padding:e.spacing(3),width:"80%",maxWidth:"500px",position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)"},forgot:{margin:e.spacing(1),float:"right"},forgotDialog:{padding:e.spacing(3)}}})))((function(e){var a=e.classes,t=e.history,r=e.fetchCurrentUserDetails;return l.a.createElement(m.a,{className:a.root},l.a.createElement(C,{onLogin:function(){return n.a.async((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n.a.awrap(r());case 2:t.push("/");case 3:case"end":return e.stop()}}))}}),l.a.createElement(p.a,{component:s.b,to:"/login/forgot",className:a.forgot},"Forgot password?"),l.a.createElement(c.b,{path:"/login/forgot",render:function(e){var r=e.location,n=new URLSearchParams(r.search).get("token");return l.a.createElement(f.a,{classes:{paper:a.forgotDialog},open:!0,onClose:function(){return t.push("/login")}},l.a.createElement(S,{onExit:function(){return t.push("/login")},token:n,onPasswordReset:function(){return t.push("/login")}}))}}))}))}}]);
//# sourceMappingURL=10.8619c5dc.chunk.js.map