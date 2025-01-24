import './homeStyle.css'

const homeStyle = () => {
    const backgroundImage = 'url(../../image/עוגת גבינה.jpg)'
    return (
        <>
             <div className="home"style={{ backgroundImage: backgroundImage }}>
                 <div className="content">
                          <h2>מבחר מתכונים</h2>
                          <p>באתר תמצאו מגוון רחב של מתכונים, לכל אירוע</p>
                          <p>כנסו לקטגוריית "מתכונים" ותהנו משפע מתכונים</p>
                        </div>
                 </div>
        </>
    )
}

export default homeStyle
