import { useEffect, useState } from "react";
import { TVShowAPI } from "./api/tv-show";
import "./global.css";
import s from "./style.module.css";
import { BACKDROP_BASE_URL } from "./config";
import { TVShowDetail } from "./components/TVShowDetail/TVShowDetail";
import { Logo } from "./components/Logo/Logo";
import logo from "./assets/images/logo.png"
import { TVShowListItem } from "./components/TVShowListItem/TVShowListItem";
import { TVShowList } from "./components/TVShowList/TVShowList";

// Le composant App est le coeur de l'application
export function App() {

    // On utilise les hooks pour gérer l'état des émissions de currentShow et des recommandations
    const [currentTVShow, setCurrentTVShow] = useState();
    const [recommendationList, setRecommendationList] = useState([]);

    // Cette fonction récupère les émissions populaires et met à jour l'état
    async function fetchPopulars() {
        const populars = await TVShowAPI.fetchPopulars();
        if (populars.length > 0) {
            setCurrentTVShow(populars[0]);
        }
    }

    // Cette fonction récupère les recommandations pour une émission et met à jour l'état
    async function fetchRecommendations(tvShowId) {
        const recommendations = await TVShowAPI.fetchRecommendations(tvShowId);
        if (recommendations.length > 0) {
            setRecommendationList(recommendations.slice(0, 10));
        }
    }

    // On utilise useEffect pour appeler fetchPopulars() au montage du composant
    useEffect(() => {
        fetchPopulars();
    }, []);

    // Un autre useEffect pour appeler fetchRecommendations() chaque fois que currentTVShow change
    useEffect(() => {
        if (currentTVShow) {
            fetchRecommendations(currentTVShow.id)
        }
    }, [currentTVShow]);

    // Fonction pour définir l'émission en cours à partir d'une recommandation 
    // (pour l'instant, elle se contente d'afficher une alerte)
    function setCurrentTVShowFromRecommendation(tvShow) {
        alert(JSON.stringify(tvShow))
    }

    // Le rendu du composant App
    return (
        <div className={s.main_container}
            style={{ background: currentTVShow ? `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url("${BACKDROP_BASE_URL}${currentTVShow.backdrop_path}") no-repeat center / cover` : "black", }}>
            <div className={s.header}>
                <div className="row">
                    <div className="col-4">
                        <Logo image={logo} title="Watowatch" subtitle="Find a show you may like" />
                    </div>
                    <div className="col-sm-12 col-md-4">
                        <input style={{ width: "100%" }} type="text" />
                    </div>
                </div>
            </div>
            <div className={s.tv_show_details}>
                {currentTVShow && <TVShowDetail tvShow={currentTVShow} />}
            </div>
            <div className={s.recommended_shows}>
                {recommendationList && recommendationList.length > 0 && (
                    <TVShowList tvShowList={recommendationList} />
                )}
            </div>
        </div>
    )
}

