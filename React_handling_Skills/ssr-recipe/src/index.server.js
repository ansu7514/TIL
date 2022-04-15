import ReactDoMSever from 'react-dom/server';

const html = ReactDoMSever.renderToString(
    <div>Hello Server Side Rendering!</div>
);

console.log(html);