(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{34:function(t,e,n){t.exports=n(65)},39:function(t,e,n){},58:function(t,e,n){},64:function(t,e,n){},65:function(t,e,n){"use strict";n.r(e);var a=n(0),i=n.n(a),o=n(30),s=n.n(o),r=(n(39),n(2)),c=n(3),u=n(5),l=n(4),p=n(6),m=(n(40),n(14)),h=n(11),d=n.n(h),f=(n(58),function(t){function e(){return Object(r.a)(this,e),Object(u.a)(this,Object(l.a)(e).apply(this,arguments))}return Object(p.a)(e,t),Object(c.a)(e,[{key:"render",value:function(){var t=this,e="",n=i.a.createElement(m.b,{to:"/quizzes/".concat(this.props.quiz.slug),className:"btn btn-primary d-block",style:{width:"auto"}},"Start Quiz"),o="";return this.props.quiz.quiztakers_set&&this.props.quiz.quiztakers_set.completed&&(e=this.props.quiz.quiztakers_set.correct_answers/this.props.quiz.questions_count*100,o=this.props.quiz.quiztakers_set.completed?i.a.createElement("button",{onClick:function(){return t.props.reset(t.props.quiz.slug)}},"Reset Quiz"):"",n=i.a.createElement("h5",null,"Score: ",e,"%")),i.a.createElement(a.Fragment,null,i.a.createElement("div",{className:"card"},i.a.createElement("div",{className:"card-body text-left"},i.a.createElement("div",{className:"card-title d-inline-block mb-0"},i.a.createElement("h1",null,this.props.quiz.name)),i.a.createElement("div",{className:"card-text d-inline-block ml-3"},"Description: ",this.props.quiz.description," ",i.a.createElement("span",{className:"ml-3"},"Questions Count: ",this.props.quiz.questions_count)),n,o)))}}]),e}(i.a.Component)),v=function(t){function e(){var t,n;Object(r.a)(this,e);for(var a=arguments.length,i=new Array(a),o=0;o<a;o++)i[o]=arguments[o];return(n=Object(u.a)(this,(t=Object(l.a)(e)).call.apply(t,[this].concat(i)))).state={quizzes:null,redirect:!1},n.config=function(){return{headers:{"Content-Type":"application/json","Access-Control-Allow-Origin":"*","Access-Control-Allow-Methods":"GET,PUT,POST,DELETE,PATCH,OPTIONS",Authorization:"Token ".concat(n.props.token)}}},n.resetQuiz=function(t,e,a){d.a.post("http://127.0.0.1:8000/api/quizresult/".concat(t,"/"),null,n.config()).then((function(t){})).catch((function(t){console.log(t)}));var i=n.state.quizzes;i.find((function(e,n){e.slug===t&&(i[n].quiztakers_set.completed=!1)}));n.setState({quizzes:i})},n}return Object(p.a)(e,t),Object(c.a)(e,[{key:"componentDidMount",value:function(){var t=this;d.a.get("".concat("http://127.0.0.1:8000/api/quizzes/"),this.config()).then((function(e){t.setState({quizzes:e.data}),console.log(e.data)}))}},{key:"render",value:function(){var t=this;return this.state.quizzes?i.a.createElement(a.Fragment,null,i.a.createElement("nav",{className:"navbar fixed-top navbar-light bg-light"},i.a.createElement("span",{className:"navbar-brand mb-0 h1"},"Quiz Application"),i.a.createElement("a",{href:"http://127.0.0.1:8000/admin/"}," Admin")),i.a.createElement("main",{role:"main",className:"container"},this.state.quizzes.map((function(e,n){return i.a.createElement(f,{key:n,reset:t.resetQuiz,quiz:e})})))):i.a.createElement("div",null)}}]),e}(i.a.Component),b=function(t){function e(){return Object(r.a)(this,e),Object(u.a)(this,Object(l.a)(e).apply(this,arguments))}return Object(p.a)(e,t),Object(c.a)(e,[{key:"render",value:function(){var t=this;return i.a.createElement("div",null,i.a.createElement("input",{onClick:function(){return t.props.ooc(t.props.answer.id)},type:"radio",name:this.props.answer.question}),i.a.createElement("label",{htmlFor:this.props.id},this.props.answer.text))}}]),e}(i.a.Component),g=function(t){function e(){return Object(r.a)(this,e),Object(u.a)(this,Object(l.a)(e).apply(this,arguments))}return Object(p.a)(e,t),Object(c.a)(e,[{key:"render",value:function(){var t=this;return i.a.createElement(a.Fragment,null,i.a.createElement("h1",{id:"".concat(this.props.id," question"),"data-id":this.props.question.id},this.props.question.label),this.props.question.answer_set.map((function(e,n){return i.a.createElement(b,{ooc:t.props.ooc,key:n,answer:e})})))}}]),e}(i.a.Component),E=n(13),z=function(t){function e(){var t,n;Object(r.a)(this,e);for(var a=arguments.length,i=new Array(a),o=0;o<a;o++)i[o]=arguments[o];return(n=Object(u.a)(this,(t=Object(l.a)(e)).call.apply(t,[this].concat(i)))).state={quiz:null,arrayLength:0,activeQuestion:0,activeOption:null},n.config=function(){return{headers:{"Content-Type":"application/json","Access-Control-Allow-Origin":"*","Access-Control-Allow-Methods":"GET,PUT,POST,DELETE,PATCH,OPTIONS",Authorization:"Token ".concat(n.props.token)}}},n.optionOnChange=function(t){n.setState({activeOption:t})},n.sendResponse=function(t,e,a){var i=JSON.stringify({quiztaker:t,question:e,answer:a});d.a.post("http://127.0.0.1:8000/api/response/",i,n.config()).then((function(t){console.log(t.data)})).catch((function(t){console.log(t)}))},n.submit=function(t,e,a){var i=n.props.match.params.slug,o=JSON.stringify({quiztaker:t,question:e,answer:a});d.a.post("http://127.0.0.1:8000/api/quizzes/".concat(i,"/"),o,n.config()).then((function(t){n.setState({quiz:t.data.quiz})})).catch((function(t){console.log(t.response.data)}))},n._next=function(){var t=document.getElementById(n.state.activeQuestion.toString()+" question"),e=parseInt(t.dataset.id),a=n.state.activeOption;null!==a&&n.state.activeOption!==n.state.arrayLength-1&&n.sendResponse(n.state.quiz.quiztakers_set.id,e,a),!n.state.activeQuestion===n.state.arrayLength-1?n.setState({activeQuestion:n.state.activeQuestion+1,activeOption:null}):n.submit(n.state.quiz.quiztakers_set.id,e,a)},n._prev=function(){if(0===!n.state.activeQuestion){var t=document.getElementById(n.state.activeQuestion.toString()+" question"),e=parseInt(t.dataset.id),a=n.state.activeOption;null!==a&&n.sendResponse(n.state.quiz.quiztakers_set.id,e,a)}n.setState({activeQuestion:n.state.activeQuestion-1,answer:null})},n}return Object(p.a)(e,t),Object(c.a)(e,[{key:"componentDidMount",value:function(){var t=this,e=this.props.match.params.slug;d.a.get("".concat("http://127.0.0.1:8000/api/quizzes/").concat(e,"/"),this.config()).then((function(e){t.setState({quiz:e.data.quiz,arrayLength:e.data.quiz.question_set.length}),console.log(e.data)}))}},{key:"render",value:function(){var t=this;if(null==this.state.quiz)return i.a.createElement("div",null);if(!0===this.state.quiz.quiztakers_set.completed)return i.a.createElement(E.a,{to:"/quizzes"});var e=this.state.activeQuestion===this.state.arrayLength-1?"Submit":"Next";return i.a.createElement(a.Fragment,null,i.a.createElement("div",{className:"container"},i.a.createElement("div",{className:"row"},this.state.quiz.question_set.map((function(e,n){var a=t.state.activeQuestion===n?"d-block":"d-none";return i.a.createElement("div",{key:n,className:"col-lg-5 col-md-6 col-sm-8 col-12 mx-auto ".concat(a)},i.a.createElement("div",{className:"card"},i.a.createElement("form",null,i.a.createElement(g,{ooc:t.optionOnChange,question:e,id:n}))))})))),i.a.createElement("button",{onClick:function(){return t._prev()}},"Previous"),i.a.createElement("button",{onClick:function(){return t._next()}},e))}}]),e}(i.a.Component),O=n(33),q=(n(64),function(t){function e(){var t,n;Object(r.a)(this,e);for(var a=arguments.length,i=new Array(a),o=0;o<a;o++)i[o]=arguments[o];return(n=Object(u.a)(this,(t=Object(l.a)(e)).call.apply(t,[this].concat(i)))).state={username:"",password:""},n.setCookie=function(t,e,n){var a=new Date;a.setTime(a.getTime()+24*n*60*60*1e3);var i="expires="+a.toUTCString();document.cookie=t+"="+e+";"+i+";path=/"},n.onSubmit=function(t){t.preventDefault();var e=JSON.stringify({username:n.state.username,password:n.state.password});d.a.post("http://127.0.0.1:8000/api/auth/login",e,{headers:{"Content-Type":"application/json","Access-Control-Allow-Origin":"*","Access-Control-Allow-Methods":"GET,PUT,POST,DELETE,PATCH,OPTIONS"}}).then((function(t){console.log(t.data),t.data.token&&(n.setCookie("atn",t.data.token,365),n.props.setAuthenticated())}))},n.onChange=function(t){return n.setState(Object(O.a)({},t.target.name,t.target.value))},n}return Object(p.a)(e,t),Object(c.a)(e,[{key:"render",value:function(){var t=this;return i.a.createElement("form",{className:"form-signin"},i.a.createElement("h1",{className:"h3 mb-3 font-weight-normal"},"QUIZ MANIA"),i.a.createElement("label",{htmlFor:"inputUsername",className:"sr-only"},"Username"),i.a.createElement("input",{type:"text",name:"username",onChange:function(e){return t.onChange(e)},id:"inputUsername",className:"form-control",placeholder:"Username",required:!0,autoFocus:!0}),i.a.createElement("label",{htmlFor:"inputPassword",className:"sr-only"},"Password"),i.a.createElement("input",{type:"password",onChange:function(e){return t.onChange(e)},name:"password",id:"inputPassword",className:"form-control",placeholder:"Password",required:!0}),i.a.createElement("button",{className:"btn btn-lg btn-primary btn-block",onClick:function(e){return t.onSubmit(e)},type:"submit"},"Sign in"),i.a.createElement("p",{className:"mt-5 mb-3 text-muted"},"\xa9AmitY"))}}]),e}(a.Component)),k=n(16),y=function(t){var e=t.component,n=(t.auth,Object(k.a)(t,["component","auth"]));return i.a.createElement(E.b,Object.assign({},n,{render:function(t){if(n.isAuthenticated){if(""!==t.location.search){var a=t.location.search.split("?next=")[1];return i.a.createElement(E.a,{to:a})}return i.a.createElement(E.a,{to:"/quizzes"})}return i.a.createElement(e,Object.assign({},t,{setAuthenticated:n.setAuthenticated}))}}))};var j=function(t){var e=t.component,n=(t.auth,t.loading,Object(k.a)(t,["component","auth","loading"]));return i.a.createElement(E.b,Object.assign({},n,{render:function(t){return n.isAuthenticated?i.a.createElement(e,Object.assign({},t,{token:n.token})):"/account/logout"===t.location.pathname?i.a.createElement(E.a,{to:"/"}):i.a.createElement(E.a,{to:"/?next=".concat(t.location.pathname)})}}))},A=function(t){function e(){var t,n;Object(r.a)(this,e);for(var a=arguments.length,i=new Array(a),o=0;o<a;o++)i[o]=arguments[o];return(n=Object(u.a)(this,(t=Object(l.a)(e)).call.apply(t,[this].concat(i)))).state={isAuthenticated:null},n.getCookie=function(t){for(var e=t+"=",n=document.cookie.split(";"),a=0;a<n.length;a++){for(var i=n[a];" "===i.charAt(0);)i=i.substring(1);if(0===i.indexOf(e))return i.substring(e.length,i.length)}return null},n.setAuthenticated=function(){n.setState({isAuthenticated:!0})},n}return Object(p.a)(e,t),Object(c.a)(e,[{key:"componentDidMount",value:function(){var t=this.getCookie("atn");this.setState({isAuthenticated:null!=t||null,token:t})}},{key:"render",value:function(){return i.a.createElement("div",{className:"App"},i.a.createElement(m.a,null,i.a.createElement(y,{isAuthenticated:this.state.isAuthenticated,exact:!0,path:"/",component:q,setAuthenticated:this.setAuthenticated}),i.a.createElement(j,{token:this.state.token,isAuthenticated:this.state.isAuthenticated,exact:!0,path:"/quizzes",component:v}),i.a.createElement(j,{token:this.state.token,isAuthenticated:this.state.isAuthenticated,exact:!0,path:"/quizzes/:slug",component:z})))}}]),e}(a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(i.a.createElement(A,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()}))}},[[34,1,2]]]);
//# sourceMappingURL=main.7fd9234d.chunk.js.map