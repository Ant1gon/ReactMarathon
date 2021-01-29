import React from 'react';
import Header from './components/Header';
import Layout from './components/Layout';
import Footer from './components/Footer';
import ReactLogo from './assets/bg3.jpg';

console.log(ReactLogo);
const logoUrl = `url('${ReactLogo}') center/cover no-repeat`;
const App = () => {
  return (
    //React.fragment
    <>
      <Header title="title" descr="desc" />
      <Layout id="1" title="title" descr="desc" urlBg= {logoUrl} />
      <Layout id="2" title="title" descr="desc" colorBg="rgb(116 225 255)"/>
      <Layout id="3" title="title" descr="desc" urlBg= {logoUrl}/>
      <Footer />
    </>
  )
}

export default App;