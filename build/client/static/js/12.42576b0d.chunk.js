(this.webpackJsonptemp=this.webpackJsonptemp||[]).push([[12],{894:function(e,t,a){"use strict";var n=a(41),r=a(0),c=a(2),i=a.n(c),s=a(75),o=a(180),l=a(895);function u(e){var t=e.auth,a=e.role,c=e.action,i=e.resource,s=e.params,o=e.yes,u=e.no,d=e.whatever,m=e.loading,p=e.fetchCurrentUserDetails,h=Object(r.useState)(null),f=Object(n.a)(h,2),b=f[0],v=f[1];if(Object(r.useEffect)((function(){null===t&&p()}),[]),Object(r.useEffect)((function(){if(t){var e=a||t.data.role;l.a.can(e,c,i,s).then((function(a){return v({access:a,excludedFields:l.a.getExcludedFields(e,c,i),params:s,resource:i,action:c,role:e,auth:t})}))}}),[t,a,c,i,s]),null!==b){var g=[];if(void 0!==d){var E=d(b);E&&g.push(Object(r.cloneElement)(E,{key:"whatever"}))}if(b.access&&void 0!==o){var O=o(b);O&&g.push(Object(r.cloneElement)(O,{key:"yes"}))}else if(void 0!==u){var j=u(b);j&&g.push(Object(r.cloneElement)(j,{key:"no"}))}return g}return m||null}u.propTypes={role:i.a.string,action:i.a.string.isRequired,resource:i.a.string.isRequired,params:i.a.object,yes:i.a.func,no:i.a.func,whatever:i.a.func,loading:i.a.node},u.defaultProps={params:{}};t.a=Object(s.b)((function(e){return{auth:e.auth}}),o)(u)},901:function(e,t,a){"use strict";var n=a(138),r=a(0),c=a.n(r),i=a(112),s=a(844),o=a(6),l=a(181),u=function(e){var t=e.render,a=e.history,r=e.dialogProps,s=e.location,o=e.path,l=e.exitPath,u=e.onMount,m=e.classes,p=e.check,h=e.popUp,f=e.onChange;return void 0===p||!0===p({path:o,location:s})?c.a.createElement(i.b,{path:o,render:function(e){return c.a.createElement(d,{render:t,history:a,exitPath:l,childProps:e,onMount:u,dialogProps:Object(n.a)({PaperProps:{className:m.paper}},r),popUp:h,onChange:f})}}):null};function d(e){var t=e.render,a=e.childProps,n=e.exitPath,i=e.dialogProps,o=e.history,l=e.onMount,u=e.popUp,d=e.onChange;return Object(r.useEffect)((function(){l&&l(a)}),[]),Object(r.useEffect)((function(){d&&d(a)}),[o.location.pathname]),u?c.a.createElement(s.a,Object.assign({open:!0,onClose:function(){return n&&o.push(n)}},i),t?t(a):null):t?t(a):null}u.defaultProps={popUp:!0};t.a=Object(l.a)(Object(o.a)((function(e){return{paper:{padding:e.spacing(3)}}})),i.h)(u)},923:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(75),i=a(180),s=a(12),o=a.n(s),l=a(41),u=a(138),d=a(112),m=a(181),p=a(840),h=a(875),f=a(320),b=a(238),v=a(216),g=a(72),E=a(6),O=a(443),j=a(338),y=a(37),x=a.n(y),k=a(23),w=a(893),S=a(894),N=a(61),C=a(10),A=a(136),P=a(888),I=a(872),L=a(276),F=a(237),R=a(434),D=a(435),T=a(14),U=a.n(T),q=Object(E.a)((function(e){return Object(F.a)({root:{display:"flex",overflowY:"auto",height:"100%"},drawer:{width:240,flexShrink:0},drawerPaper:{width:240},toggleButton:{marginRight:e.spacing(3)},body:{padding:e.spacing(3),overflowY:"auto"},content:{display:"flex",flexDirection:"column",flexGrow:1,transition:e.transitions.create("margin",{easing:e.transitions.easing.sharp,duration:e.transitions.duration.leavingScreen}),marginLeft:-240},contentShift:{transition:e.transitions.create("margin",{easing:e.transitions.easing.easeOut,duration:e.transitions.duration.enteringScreen}),marginLeft:0},slide:{height:"100%",overflowY:"auto",position:"static"}})}),{withTheme:!0})((function(e){var t=e.classes,a=e.list,c=e.body,i=e.header,s=Object(n.useState)(!0),o=Object(l.a)(s,2),u=o[0],d=o[1];return r.a.createElement(A.a,{className:t.root},r.a.createElement(P.a,{className:t.drawer,SlideProps:{className:t.slide},variant:"persistent",anchor:"left",open:u,classes:{paper:t.drawerPaper}},a),r.a.createElement("div",{className:U()(t.content,Object(C.a)({},t.contentShift,u))},r.a.createElement(I.a,{position:"static"},r.a.createElement(L.a,null,r.a.createElement(v.a,{className:t.toggleButton,onClick:function(){return d(!u)}},u?r.a.createElement(R.a,null):r.a.createElement(D.a,null)),i)),r.a.createElement("main",{className:t.body},c)))})),B=a(137),M=a(100),W=a(892),G=W.a.TEXT,Y=W.a.SELECT,J=W.a.IMAGE;var V=function(e){var t=e.title,a=e.exclude,n=e.errorNotes,c=e.onChangeEvent,i=e.values,s=e.userList,o=e.vehicleList,l=e.bookingList,u=e.footer,d=e.onError,m=e.errors,p=e.readOnly,h=e.hints,f=[{type:J,name:"accidentImageSrc",id:"accident-image",persistEvent:!0,validators:[M.l.requiredField],props:{label:"Select picture",required:!0}},{type:Y,id:"user-id",name:"userId",props:{label:"User",fullWidth:!0,items:s}},{type:Y,id:"vehicle-id",name:"vehicleId",validators:[M.l.requiredField],props:{label:"Vehicle",fullWidth:!0,items:o}},{type:Y,id:"booking-id",name:"bookingId",props:{label:"Booking ID",fullWidth:!0,items:l}},{type:G,id:"message",name:"message",validators:[M.l.requiredField,new M.a((function(e){return e&&e.length<=500}))],GridProps:{xs:12,sm:12},props:{multiline:!0,variant:"filled",fullWidth:!0,rowsMax:6,label:"Message",required:!0,inputProps:{maxLength:500}}}];return r.a.createElement(W.b,{title:t,fields:f,exclude:a,errorNotes:n,onChangeEvent:c,values:i,footer:u,errors:m,onError:d,hints:h,readOnly:p})};var X=Object(c.b)((function(e){var t=e.users,a=e.vehicles,n=e.bookings,r=null,c=null,i=null;return t&&t.data&&(r=t.data),a&&a.data&&(c=a.data),n&&n.data&&(i=n.data),{users:r,vehicles:c,bookings:i}}))((function(e){var t=e.onSubmit,a=e.values,c=e.readOnly,i=e.exclude,s=e.title,o=e.loading,u=e.hints,d=e.onChangeEvent,m=e.errorNotes,p=e.users,h=e.vehicles,f=e.bookings,v=e.showFooter,g=Object(n.useState)({}),E=Object(l.a)(g,2),O=E[0],j=E[1],y=Object(n.useState)(!1),k=Object(l.a)(y,2),w=k[0],S=k[1];Object(n.useEffect)((function(){var e=!0;for(var t in O)O[t].length&&(e=!1);S(!e)}),[O,a]);var N=x()(),C=[{value:"",label:"Loading..."}],A=[{value:"",label:"Loading..."}],P=[{value:"",label:"Loading..."}];if(f&&h){var I=p?p.map((function(e){var t=e.id,a=e.firstName,n=e.lastName,r=e.username;return{value:t,label:"".concat(a," ").concat(n," - ").concat(r)}})):[];C=I.length?I:[{value:"",label:"No users found..."}];var L=f.map((function(e){var t=e.id;return{value:t,label:t}}));A=L.length?L:[{value:"",label:"No bookings found..."}];var F=a.userId?h.reduce((function(e,t){var a=t.id,n=t.brand,r=t.model,c=t.plateNumber;return f.find((function(e){return!0===e.approved&&!1===e.finished&&e.vehicleId===a&&e.from<=N.unix()&&e.to>=N.unix()}))&&e.push({value:a,label:"".concat(n," ").concat(r," - ").concat(c)}),e}),[]):[{value:"",label:"Please select a user..."}];P=F.length?F:[{value:"",label:"No vehicles found..."}]}var R=v&&r.a.createElement(n.Fragment,null,r.a.createElement(b.a,{item:!0},r.a.createElement(B.a,{disabled:o||w,type:"submit",variant:"contained",color:"primary",onClick:function(e){e.preventDefault(),t(e)}},"Confirm")));return r.a.createElement(V,{userList:C,bookingList:A,vehicleList:P,exclude:i,title:s,values:a,onChangeEvent:d,errorNotes:m,footer:R,onError:j,errors:O,hints:u,readOnly:c})}));var _=Object(c.b)((function(e){return{auth:e.auth}}),i)((function(e){var t=e.fetchAccidents,a=e.exclude,c=e.onSubmit,i=e.auth,s=Object(n.useState)([]),o=Object(l.a)(s,2),d=o[0],m=o[1],p=Object(n.useState)(!1),h=Object(l.a)(p,2),f=h[0],b=h[1],v=Object(n.useState)({}),g=Object(l.a)(v,2),E=g[0],O=g[1];return Object(n.useEffect)((function(){i&&i.data&&O(Object(u.a)({},E,{userId:i.data.id}))}),[i]),r.a.createElement(X,{title:"Report an accident",values:E,onChangeEvent:function(e,t,a){return a.target.files?O(Object(u.a)({},e,Object(C.a)({},t,a.target.files[0]||""))):O(e)},errorNotes:d,exclude:a,loading:f,showFooter:!0,onSubmit:function(){b(!0),M.b.createAccident(E).then((function(){t(),O({}),b(!1),c&&c()})).catch((function(e){m([Object(M.c)(e).message]),b(!1)}))}})})),z=a(901);var H=Object(m.a)(d.h,Object(c.b)((function(e){return{bookings:e.bookings,auth:e.auth,vehicles:e.vehicles}})))((function(e){var t=e.history,a=e.classes;return r.a.createElement(n.Fragment,null,r.a.createElement(z.a,{path:"/accidents/new",check:function(e){return"new"===e.path.slice(-3)},exitPath:"/accidents",render:function(e){var a=e.location,n=[];return a.state&&a.state.createAccess&&a.state.createAccess.excludedFields&&(n=a.state.createAccess.excludedFields),r.a.createElement(_,{exclude:n,onSubmit:function(){return t.push("/accidents")}})}}),r.a.createElement(S.a,{action:k.Action.CREATE,resource:k.Resource.ACCIDENTS,yes:function(e){return r.a.createElement(B.a,{className:a.button,type:"submit",variant:"contained",color:"primary",onClick:function(){return t.push("/accidents/new",{createAccess:e})}},"Report an accident")}}))})),K=Object(m.a)(Object(E.a)((function(e){return{actionButton:Object(u.a)({},e.mixins.toolbar,{borderRadius:0,width:"100%"}),accidentImageSrc:{maxWidth:"500px",width:"50%",display:"block",margin:"0 auto"}}})),Object(c.b)((function(e){var t=e.accidents,a=e.vehicles,n=e.auth,r=null,c=null,i={};return t&&t.data&&(r=t.data),a&&a.data&&(c=a.data),n&&n.data&&(i=n.data),{accidents:r,vehicles:c,auth:i}}),i),d.h)((function(e){var t=e.accidents,a=e.vehicles,c=e.history,i=e.classes,s=e.auth,u=e.fetchAccidents,d=Object(n.useState)({}),m=Object(l.a)(d,2),E=m[0],y=m[1],C=[];t&&a&&(C=t.length>0?t.map((function(e){return r.a.createElement(S.a,{key:e.id,action:k.Action.READ,resource:k.Resource.ACCIDENTS,params:{accessor:s,target:e},yes:function(t){var n=a.find((function(t){return t.id===e.vehicleId}));return r.a.createElement(p.a,{selected:E&&E.accident&&E.accident.id===e.id,button:!0,onClick:function(){var a,n;return o.a.async((function(r){for(;;)switch(r.prev=r.next){case 0:return r.prev=0,r.next=3,o.a.awrap(N.a.fetchAccident(e.id));case 3:return a=r.sent,r.next=6,o.a.awrap(N.a.fetchUser(e.userId));case 6:return n=r.sent,r.next=9,o.a.awrap(N.a.updateAccident({id:e.id,read:!0}));case 9:c.push("/accidents/".concat(e.id),{accident:a.data,user:n.data,readAccess:t}),r.next=16;break;case 12:r.prev=12,r.t0=r.catch(0),console.error(r.t0),c.push("/accidents");case 16:case"end":return r.stop()}}),null,null,[[0,12]])}},r.a.createElement(h.a,{src:e.accidentImageSrc||void 0},!e.accidentImageSrc&&r.a.createElement(O.a,null)),r.a.createElement(f.a,{primary:"".concat(n.brand," ").concat(n.model),secondary:n.plateNumber}))}})})):r.a.createElement(p.a,null,r.a.createElement(f.a,{primary:"There seems to be nothing here"})));var A=r.a.createElement(b.a,{container:!0,justify:"space-between"},r.a.createElement(w.a,{roles:w.b.REPORT_ACCIDENTS},r.a.createElement(H,{classes:{button:i.actionButton}})));return r.a.createElement(q,{list:r.a.createElement(n.Fragment,null,A,C),header:E&&E.accident?r.a.createElement(v.a,{"aria-label":"Delete",className:i.deleteButton,onClick:function(){return N.a.updateAccident({id:E.accident.id,deleted:!0}).then((function(){u(),y({}),c.push("/accidents")}))}},r.a.createElement(j.a,null)):null,body:r.a.createElement(z.a,{path:"/accidents/:id",check:function(e){var t=e.location;return/\/accidents\/\d+/.test(t.pathname)},render:function(){if(E&&E.accident&&E.user){var e=E.accident,t=E.user,a=e.accidentImageSrc,c=e.message,s=e.createdAt,o=t.firstName,l=t.lastName;return r.a.createElement(b.a,{container:!0,spacing:2},a&&r.a.createElement(b.a,{item:!0,xs:12},r.a.createElement("img",{src:a,alt:"Accident",className:i.accidentImageSrc})),r.a.createElement(b.a,{item:!0,xs:12},r.a.createElement(g.a,null,r.a.createElement(g.a,{variant:"h6",component:"span",display:"inline"},"From:"),r.a.createElement(g.a,{variant:"subtitle1",component:"span",display:"inline"},"".concat(o," ").concat(l))),r.a.createElement(g.a,null,r.a.createElement(g.a,{variant:"h6",component:"span",display:"inline"},"Date:"),r.a.createElement(g.a,{variant:"subtitle1",component:"span",display:"inline"},x()(s,"X").format("LLL"))),c&&r.a.createElement(n.Fragment,null,r.a.createElement(g.a,{variant:"h6",component:"span",display:"inline"},"Message:"),c.split("\n").map((function(e,t){return r.a.createElement(g.a,{key:t,variant:"body1"},e)})))))}return null},popUp:!1,onChange:function(e){var t=e.location;t&&t.state&&t.state.accident&&t.state.user&&y({accident:t.state.accident,user:t.state.user})}})})}));t.default=Object(c.b)(null,i)((function(e){var t=e.fetchAccidents,a=e.fetchBookings,c=e.fetchCurrentUserDetails,i=e.fetchVehicles;return Object(n.useEffect)((function(){t(),a(),c(),i()}),[]),r.a.createElement(K,null)}))}}]);
//# sourceMappingURL=12.42576b0d.chunk.js.map