import s from "./style.module.css";

export function Logo({ image, title, subtitle }) {
    return (
        <>
            <div className={s.container}>
                <img src={image} alt="Logo" />
                <span className={s.title}>{title}</span>
            </div>
            <span className={s.subtitle}>{subtitle}</span>
        </>
    )
}