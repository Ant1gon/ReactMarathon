import s from './style.module.css'
const Layout = ({ id = false, title = false, urlBg = false, colorBg = false, children }) => {
    let backgroundUrl = `url('${urlBg}') center/cover no-repeat` ;
    let backgroundColor = { backgroundColor: `${colorBg}` }
    const style = {};
    if (urlBg) { style.background = backgroundUrl }
    if (colorBg) { style.backgroundColor = `${colorBg}` }

    return <>
        <section className={s.root} id={id} style={style}>
            <div className={s.wrapper}>
                <article>
                    <div className={s.title}>
                        <h3>{title}</h3>
                        <span className={s.separator}></span>
                    </div>
                    <div className={`${s.desc} ${s.full}`}>
                        {children}
                    </div>
                </article>
            </div>
        </section>
    </>
};

export default Layout;