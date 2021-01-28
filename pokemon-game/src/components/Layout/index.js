import s from './style.module.css'
const Layout = ({ id = false, title = false, desc = false, urlBg = false, colorBg = false }) => {
    let backgroundUrl = { background: `${urlBg}` }
    let backgroundColor = { backgroundColor: `${colorBg}` }

    return <>
        <section className={s.root} id={id} style={ urlBg ? backgroundUrl : backgroundColor}>
            <div className={s.wrapper}>
                <article>
                    <div className={s.title}>
                        <h3>{title}</h3>
                        <span className={s.separator}></span>
                    </div>
                    <div className={s.desc + s.full}>
                        <p>{desc}</p>
                    </div>
                </article>
            </div>
        </section>
    </>
};

export default Layout;