(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{138:function(e,t,a){"use strict";a.r(t),a.d(t,"tagPageQuery",function(){return d}),a(74);var n=a(12),r=a.n(n),i=a(0),o=a.n(i),l=a(150),c=a.n(l),s=a(145),u=a(149),m=function(e){function t(){return e.apply(this,arguments)||this}return r()(t,e),t.prototype.render=function(){var e=this.props.data.allMarkdownRemark.edges.map(function(e){return o.a.createElement("li",{key:e.node.fields.slug},o.a.createElement(s.Link,{to:e.node.fields.slug},o.a.createElement("h2",{className:"is-size-2"},e.node.frontmatter.title)))}),t=this.props.pageContext.tag,a=this.props.data.site.siteMetadata.title,n=this.props.data.allMarkdownRemark.totalCount,r=n+" post"+(1===n?"":"s")+" tagged with “"+t+"”";return o.a.createElement(u.a,null,o.a.createElement("section",{className:"section"},o.a.createElement(c.a,{title:t+" | "+a}),o.a.createElement("div",{className:"container content"},o.a.createElement("div",{className:"columns"},o.a.createElement("div",{className:"column is-10 is-offset-1",style:{marginBottom:"6rem"}},o.a.createElement("h3",{className:"title is-size-4 is-bold-light"},r),o.a.createElement("ul",{className:"taglist"},e),o.a.createElement("p",null,o.a.createElement(s.Link,{to:"/tags/"},"Browse all tags")))))))},t}(o.a.Component);t.default=m;var d="4202630850"},144:function(e,t,a){var n;e.exports=(n=a(146))&&n.default||n},145:function(e,t,a){"use strict";a.r(t),a.d(t,"graphql",function(){return h}),a.d(t,"StaticQueryContext",function(){return p}),a.d(t,"StaticQuery",function(){return f});var n=a(0),r=a.n(n),i=a(8),o=a.n(i),l=a(143),c=a.n(l);a.d(t,"Link",function(){return c.a}),a.d(t,"withPrefix",function(){return l.withPrefix}),a.d(t,"navigate",function(){return l.navigate}),a.d(t,"push",function(){return l.push}),a.d(t,"replace",function(){return l.replace}),a.d(t,"navigateTo",function(){return l.navigateTo});var s=a(35);a.d(t,"waitForRouteChange",function(){return s.c});var u=a(144),m=a.n(u);a.d(t,"PageRenderer",function(){return m.a});var d=a(36);a.d(t,"parsePath",function(){return d.a});var p=r.a.createContext({}),f=function(e){return r.a.createElement(p.Consumer,null,function(t){return e.data||t[e.query]&&t[e.query].data?(e.render||e.children)(e.data?e.data.data:t[e.query].data):r.a.createElement("div",null,"Loading (StaticQuery)")})};function h(){throw new Error("It appears like Gatsby is misconfigured. Gatsby related `graphql` calls are supposed to only be evaluated at compile time, and then compiled away,. Unfortunately, something went wrong and the query was left in the compiled code.\n\n.Unless your site has a complex or custom babel/Gatsby configuration this is likely a bug in Gatsby.")}f.propTypes={data:o.a.object,query:o.a.string.isRequired,render:o.a.func,children:o.a.func}},146:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),i=a(8),o=a.n(i),l=a(37),c=a(1),s=function(e){var t=e.location,a=c.default.getResourcesForPathname(t.pathname);return r.a.createElement(l.a,{location:t,pageResources:a})};s.propTypes={location:o.a.shape({pathname:o.a.string.isRequired}).isRequired},t.default=s},147:function(e,t,a){},149:function(e,t,a){"use strict";var n=a(0),r=a.n(n),i=a(150),o=a.n(i),l=a(145),c=function(){return r.a.createElement("nav",{className:"navbar is-transparent"},r.a.createElement("div",{className:"container"},r.a.createElement(l.Link,{className:"content content--top",to:"/"},r.a.createElement("h2",null,"Alex Moreton"),r.a.createElement("p",null,"Front end developer portfolio")),r.a.createElement("div",{className:"content content--top"},r.a.createElement(l.Link,{className:"navbar-item",to:"/about"},"About"),r.a.createElement("a",{className:"navbar-item",href:"https://github.com/lxm7"},"Github"),r.a.createElement("a",{className:"navbar-item",href:"https://www.linkedin.com/in/alex-moreton-3519633b/"},"LinkedIn"),r.a.createElement("a",{className:"navbar-item",href:"https://stackoverflow.com/users/1341935/lxm7?tab=profile"},"Stackoverflow"))))};a(147),t.a=function(e){var t=e.children;return r.a.createElement("div",null,r.a.createElement(o.a,{title:"Portfolio | Alex Moreton"}),r.a.createElement(c,null),r.a.createElement("div",null,t))}}}]);
//# sourceMappingURL=component---src-templates-tags-js-edcc64afdd618cd689ac.js.map