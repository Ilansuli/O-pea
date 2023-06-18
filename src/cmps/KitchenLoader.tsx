type KitchenLoaderProps = {

};

const KitchenLoader: React.FC<KitchenLoaderProps> = ({ }) => {
    return (
        <div id="loading">
            <div id="loading--inner" className="loading--inner">

                <div className="loading--box upper loading--box-animate" style={{
                    left: '20px',
                    bottom: ' 0',
                    animationDelay: '.7s'
                }}></div>
                <div className="loading--box loading--box-animate" style={{left: '32px', bottom: '0', animationDelay: '.6s'}}></div>
                <div className="loading--box dbl-width loading--box-animate" style={{left: '44px', bottom: '0', animationDelay: '.5s'}}></div>
                <div className="loading--box sink loading--box-animate" style={{left: '50px', bottom: '11px', animationDelay: '.5s'}}></div>
                <div className="loading--box hang loading--box-animate" style={{left: '44px', top: '0', animationDelay: '.4s'}}></div>
                <div className="loading--box hang loading--box-animate" style={{left: '56px', top: '0', animationDelay: '.3s'}}></div>
                <div className="loading--box loading--box-animate" style={{left: '68px', bottom:' 0', animationDelay: '.1s'}}></div>
                <div className="loading--box upper loading--box-animate" style={{left: '68px', top: '0', animationDelay: '.1s'}}></div>
                <div className="loading--box dbl-height loading--box-animate" style={{left: '80px', bottom: '0'}}></div>
                <div className="loading--text">LADE</div>
            </div>
        </div >
    );
}
export default KitchenLoader