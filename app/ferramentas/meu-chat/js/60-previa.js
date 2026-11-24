/* Meu Chat — 60-previa.js: 👁 ver o código funcionando, na hora.
   - HTML: abre a página como ela é.
   - TSX / JSX (React): monta com React + Babel + Tailwind (pela internet) e mostra o componente.
   Os erros aparecem embaixo, em vermelho. */
(function (MC) {
  'use strict';
  let atual = null;
  const ESPIA = '<script>(function(){function m(t){try{parent.postMessage({mcPrevia:1,erro:String(t).slice(0,600)},"*")}catch(e){}}' +
    'addEventListener("error",function(e){m((e.message||"Erro")+(e.lineno?" (linha "+e.lineno+")":""))});' +
    'addEventListener("unhandledrejection",function(e){m("Promise: "+(e.reason&&e.reason.message||e.reason))});' +
    'var o=console.error;console.error=function(){m([].slice.call(arguments).join(" "));o&&o.apply(console,arguments)}})();<\/script>';
  function paginaHTML(cod) {
    if (!/<html|<body|<head/i.test(cod)) cod = '<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head><body>' + cod + '</body></html>';
    return /<head[^>]*>/i.test(cod) ? cod.replace(/<head([^>]*)>/i, (x) => x + ESPIA) : ESPIA + cod;
  }
  function paginaReact(cod) {
    const nome = (cod.match(/export\s+default\s+(?:function\s+)?([A-Z][\w$]*)/) || cod.match(/(?:function|const|let|class)\s+([A-Z][\w$]*)/) || [])[1] || '';
    const fonte = cod + '\n;module.exports.__mcApp = (typeof ' + (nome || 'App') + ' !== "undefined" ? ' + (nome || 'App') + ' : undefined);';
    return '<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">' + ESPIA +
      '<script src="https://unpkg.com/react@18.3.1/umd/react.development.js"><\/script>' +
      '<script src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.development.js"><\/script>' +
      '<script src="https://unpkg.com/@babel/standalone@7.25.6/babel.min.js"><\/script>' +
      '<script src="https://cdn.tailwindcss.com/3.4.16"><\/script>' +
      '<style>body{margin:0;font-family:system-ui,sans-serif}</style></head><body><div id="root"></div><script>(function(){' +
      'var src=' + JSON.stringify(fonte).replace(/<\//g, '<\\/') + ';' +
      'function falha(t){document.getElementById("root").innerHTML="<pre style=\\"color:#b42318;white-space:pre-wrap;padding:12px\\">"+String(t).replace(/</g,"&lt;")+"</pre>";parent.postMessage({mcPrevia:1,erro:String(t).slice(0,600)},"*")}' +
      'if(!window.React||!window.Babel){falha("Não carregou o React/Babel: a prévia de TSX precisa de internet.");return}' +
      'try{var out=Babel.transform(src,{filename:"App.tsx",presets:[["typescript",{isTSX:true,allExtensions:true}],"react",["env",{modules:"commonjs",targets:{chrome:"100"}}]]}).code;' +
      'var module={exports:{}},exports=module.exports;' +
      'var icone=new Proxy({},{get:function(t,n){if(n==="__esModule")return false;return function(p){return React.createElement("span",Object.assign({},p,{style:Object.assign({display:"inline-block",width:"1em",height:"1em",textAlign:"center"},p&&p.style)}),"◆")}}});' +
      'var falso=new Proxy({},{get:function(t,n){if(n==="__esModule")return false;return function(p){return React.createElement("div",null,p&&p.children)}}});' +
      'function req(n){if(n==="react")return React;if(n==="react-dom"||n==="react-dom/client")return ReactDOM;if(/\\.css$/.test(n))return {};if(/lucide|icons|heroicons/.test(n))return icone;console.warn("peça de fora não carregada: "+n);return falso}' +
      'new Function("require","exports","module","React",out)(req,exports,module,React);' +
      'var C=module.exports.default||module.exports.__mcApp;if(!C){falha("Não achei o componente: use \\"export default function App()\\".");return}' +
      'ReactDOM.createRoot(document.getElementById("root")).render(React.createElement(C));' +
      '}catch(e){falha(e.message)}})();<\/script></body></html>';
  }
  function tipoDe(ling, cod) {
    ling = (ling || '').toLowerCase();
    if (/^(tsx|jsx|react)$/.test(ling)) return 'react';
    if (/^(ts|typescript|js|javascript)$/.test(ling) && /return\s*\(?\s*</.test(cod) && /(React|useState|export default)/.test(cod)) return 'react';
    if (/^(html|htm|svg|xml)$/.test(ling) || /<html|<body|<div|<!doctype/i.test(cod)) return 'html';
    if (/^(css)$/.test(ling)) return 'css';
    return '';
  }
  function abrir(ling, cod, id) {
    const tipo = tipoDe(ling, cod);
    if (!tipo) {
      // 17/11: código sem prévia (Python, SQL…) guardado em 🧪: abre só o editor para mexer
      if (id) { atual = { ling, cod, tipo: '', id }; MC.$('#previa-tipo').textContent = (ling || 'texto') + ' (sem prévia)'; MC.$('#previa').hidden = false; MC.$('#previa-quadro').srcdoc = '<p style="font-family:sans-serif;padding:12px">Este tipo de código (' + (ling || 'texto') + ') não roda aqui. Mexa no editor e toque em 💾.</p>'; MC.$('#previa-editor').hidden = false; MC.$('#previa-cod').value = cod; return; }
      MC.aviso('Esse tipo de código (' + (ling || 'texto') + ') não tem prévia — só HTML, TSX e JSX.'); return;
    }
    atual = { ling, cod, tipo, id: id || (atual && atual.cod === cod ? atual.id : null) };
    const pagina = tipo === 'react' ? paginaReact(cod) : tipo === 'css' ? paginaHTML('<style>' + cod + '</style><h1>Título</h1><p>Texto de exemplo.</p><button>Botão</button>') : paginaHTML(cod);
    MC.$('#previa-tipo').textContent = tipo === 'react' ? 'React (' + (ling || 'tsx') + ')' : tipo.toUpperCase();
    MC.$('#previa-erros').innerHTML = '';
    MC.$('#previa').hidden = false;
    MC.$('#previa-quadro').srcdoc = pagina;
  }
  window.addEventListener('message', (e) => {
    const d = e.data; if (!d || !d.mcPrevia || MC.$('#previa').hidden) return;
    const box = MC.$('#previa-erros'); const el = document.createElement('div'); el.textContent = '⚠ ' + d.erro; box.appendChild(el);
    // 🧪 18/11: um botão para mandar os erros para a IA consertar
    if (!box.querySelector('.bt-erros-ia')) { const b = document.createElement('button'); b.className = 'bt peq primario bt-erros-ia'; b.textContent = '💬 Mandar os erros para a IA'; b.onclick = () => { const erros = [...box.querySelectorAll('div')].map((x) => x.textContent).join('\n'); const ent = MC.$('#entrada'); ent.value += (ent.value ? '\n\n' : '') + 'Abri o código no playground e deu estes erros:\n```\n' + erros.slice(0, 4000) + '\n```\nConserte e me mande o código INTEIRO de novo.'; ent.dispatchEvent(new Event('input')); MC.$('#previa').hidden = true; ent.focus(); }; box.prepend(b); }
  });
  document.addEventListener('DOMContentLoaded', () => {
    MC.$('#previa-fechar').onclick = () => { MC.$('#previa').hidden = true; MC.$('#previa-quadro').srcdoc = ''; MC.$('#previa-editor').hidden = true; };
    MC.$('#previa-recarregar').onclick = () => atual && abrir(atual.ling, atual.cod);
    // ✏️ playground: mexe no código e roda de novo, aqui mesmo
    MC.$('#previa-editar').onclick = () => { const ed = MC.$('#previa-editor'); ed.hidden = !ed.hidden; if (!ed.hidden && atual) MC.$('#previa-cod').value = atual.cod; };
    MC.$('#previa-rodar').onclick = () => { if (!atual) return; const ed = MC.$('#previa-editor'); const c = MC.$('#previa-cod').value; abrir(atual.ling, c); ed.hidden = false; };
    MC.$('#previa-copiar').onclick = () => MC.copiar(MC.$('#previa-cod').value || (atual && atual.cod) || '');
    // 💾 17/11: guarda em 🧪 Meus códigos (ou atualiza o que já está guardado)
    const bG = MC.$('#previa-guardar'); if (bG) bG.onclick = async () => {
      if (!atual || !MC.codigos) return; const c = MC.$('#previa-cod').value || atual.cod;
      if (atual.id && await MC.codigos.atualizar(atual.id, c)) { atual.cod = c; MC.aviso('💾 Código atualizado em 🧪 Meus códigos', 'ok'); }
      else { const id = await MC.codigos.guardar(atual.ling, c); if (id) atual.id = id; }
    };
    MC.$('#previa-baixar').onclick = () => {
      if (!atual) return;
      if (atual.tipo === 'react') { MC.baixar('componente.' + (atual.ling === 'jsx' ? 'jsx' : 'tsx'), atual.cod); MC.baixar('componente-funcionando.html', paginaReact(atual.cod), 'text/html'); }
      else MC.baixar('pagina.html', atual.tipo === 'css' ? '<style>' + atual.cod + '</style>' : atual.cod, 'text/html');
      MC.aviso('⤓ Baixado', 'ok');
    };
  });
  MC.previa = { abrir, tipoDe, paginaReact, paginaHTML };
})(window.MC);
