import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';
import Carousel from './components/carousel';
import { marked } from 'marked';

const dummyData = {
  introduction:{
    en: `Web developer and language learning enthusiast`,
    de: `Web Developer und Sprachliebhaber`,
  },
  projects: [
    {
      title: "E-commerce homepage",
      images: [
                ["./images/e-commerce-1.png", "Example image of the e-commerce site 1"],
                ["./images/e-commerce-2.png", "Example image of the e-commerce site 2"], 
                ["./images/e-commerce-3.png", "Example image of the e-commerce site 3"], 
              ],
      description: {
        en: `I copied the design of a popular electronics retailer's landing page in order to improve at CSS, accessibility, responsive design, and creating reusable components.
        This project also caused me to change my workflow in following projects, focusing on functionality first and then styling. This has made me much more efficient as it greatly reduced the amount of times I had to go back and restyle stuff.`,
        de: `Ich habe das Design der Startseite eines großen Elektronikhändlers nachgebaut, um besser in CSS, Accessibility, Responsive Design, und der herstellung von Reusable Components zu werden.
        Desweiteren hat mich diese Projekt dazu meine Workflow neu zu gestalten. Ich baue nun erst die Funktionalität und style danach. Dies hat meine Effizient um einiges gesteigert da Ich nun seltener bereits gestylte Objekte fixen muss nachdem Ich neue Funkitionalitäten hinzufüge.`,
      },
      demo: "https://tahmdev.github.io/e-commerce/",
      gitHub: "https://github.com/tahmdev/e-commerce",
    },
    {
      title: "Insta Jisho",
      images: [
                ["./images/instant-jisho.png", "Search result page for '辞書'"],
                ["./images/instant-jisho-radical.png", "Radical lookup"],
                ["./images/instant-jisho-handwriting.png", "Handwriting lookup"],
                ["./images/instant-jisho-light.png", "Search result page for '辞書' in lightmode"]
              ],
      description: {
        en: `A Japanese ↔ English dictionary. My goal was to reduce the amount of time spent on each lookup as much as possible.
        I achieved this goal by: 
        <ul> 
          <li> Automatic lookups </li>
          <li> Replacing pagination with a scrollable list of results </li>
          <li> Using Google's handwriting recognition </li>
          <li> Making sure it's easily navigatable with one hand, so you never need to put your book down</li>
        </ul>`,
        
        de: `Ein Japanisch ↔ English Wörterbuch. Mein Ziel war es die benötigte Zeit zum nachschlagen so weit es geht zu reduzieren. 
        Dieses Ziel habe Ich erreicht mit folgenden Lösungen erreicht: 
        <ul> 
          <li> Automatisches nachschlagen</li>
          <li> Seiten von Ergebnissen durch eine scrollbare Liste ersetzt </li>
          <li> Verwendung von Googles Handschrifterkennung </li>
          <li> Shortcuts welche die Navigation mit einer Hand erleichtern, so dass man sein Buch nie beiseite legen muss</li>
        </ul>
        `,
      },
      demo: "https://tahmdev.github.io/insta-jisho/",
      gitHub: "https://github.com/tahmdev/insta-jisho",
    },

    {
      title: "Multiplayer Shiritori",
      images: [
                ["./images/shiritori-ingame.png", "Team vs Team"],
                ["./images/shiritori-lobby.png", "Lobby"],
                ["./images/shiritori-lobby-browser.png", "Lobby browser"],
              ],
      description: {
        en: `An app to play Shiritori with friends. Shiritori is a classic Japanese word game where players attempt to string together words that start with the last letter of the previous word.
        This project finally made the idea of resuable components click for me. I also learned how to implement websockets and the importance of validating input on the backend.
        \n Test input for **type しりとり**: りかい、いみ、みらい、いく、くたい
        Test input for **type 漢字取**: 字面、面識、識別、別人、人生、生気
        `,
        de: `Eine App, um Shiritori mit Freunden zu spielen.
        Shiritori ist ein klassisches japanisches Wortspiel, bei dem die Spieler versuchen, Wörter aneinanderzureihen, die mit dem letzten Buchstaben des vorherigen Wortes beginnen.
        In diesem Projekt habe Ich endlich gelernt wie nutzvoll Reusable Components wirklich sind. Des weiteren habe Ich auch gelernt wie man Websockets implementiert und wie wichtig es ist User Input auf dem Backend zu validieren.
        \n Test Input für **type: しりとり**: りかい、いみ、みらい、いく、くたい
        Test Input für **type: 漢字取**: 字面、面識、識別、別人、人生、生気`,
      },
      demo: "https://kanjitori.com/",
      gitHub: "https://github.com/tahmdev/japanese-stairs",
    },
    {
      title: "More projects",
      images: [
                ["./images/weather-app.png", "Weather app"],
                ["./images/snake.png", "Snake game"], 
                ["./images/todo-list.png", "Todo list"], 
                ["./images/youtube-shuffle.png", "Youtube playlist randomizer"],
                ["./images/book-album.png", "Book album"]
              ],
      description: {
        en: `You can find more of my projects over on Github. 
        The code of my older projects may not be pretty but I pride myself in always finishing what I initially set out to do.
        My other projects include:
        <ul> 
          <li> A weather app</li>
          <li> A snake game</li>
          <li> A todo list</li>
          <li> A youtube playlist randomizer</li>
          <li> A book album</li>
        </ul>`,
        de: `Sie können mehr von meinen Projekten auf Github finden. 
        Der Code meiner älteren Projekte ist zwar nicht schön, aber Ich bin stolz darauf, dass ich immer zu Ende bringe, was ich mir vorgenommen habe.
        Ein Paar meiner anderen Projekte:
        <ul> 
          <li> Eine Wetter App</li>
          <li> Ein Snake Spiel</li>
          <li> Eine Todo List</li>
          <li> Ein Youtube Playlist Shuffler</li>
          <li> Ein Buch Album</li>
        </ul>`
      },
      demo: "",
      gitHub: "https://github.com/tahmdev?tab=repositories",
    }
  ],
  aboutMe: {
    en: `I'm an aspiring web developer, but you already knew that. I believe that responsive design and accessibility are crucial to succeeding in todays world wide web.
        I believe that my experience with language learning has been incredibly helpful in developing my skills as a developer. Additionally my experience teaching Japanese has taught me a lot about how to communicate effectively.`,
    de: `Ich bin ein Web Developer auf der Suche nach seinem ersten Job. Meiner Meinung nach ist Responsive Design und Accessibility ausschlaggebend zum Erfolg in dem heutigen Web
        Meine Erfahrung im Sprachen lernen unglaublich hilfreich in der Entwicklung meiner Entwicklungs Künste. Desweiteren erlaubt meine Erfahrung im Japanisch Nachhilfe geben mir effektiv zu kommunizieren, unabhängig von dem Technischen Verständnis meines Gegenübers.`,
  },
  contact: {
    mail: {
      en: `Send me an email at `,
      de: `Senden Sie mir eine Email:`,
    },
  }
}

function App() {
  let [language, setLangugage] = useState("de")
  
  const markdown = (text) => {
    let rawMarkup = marked.parse(text)
    return {__html: rawMarkup};
  }

  return (
    <div className="App">
      <section>
        <header>
          <div className='flex-container column center'>
            <h1>Tom Schülke</h1>
            <span className='intro-subtitle'>{dummyData.introduction[language]} </span>
            <button className='language-button' onClick={() => setLangugage(prev => prev === "en" ? "de" : "en")} >
              <>
              Click here to view this page in {language === "en" ? "German" : "English"} 
              <img className='flag' src={`https://raw.githubusercontent.com/lipis/flag-icons/4055e1a66f6ac3d5238ab353189d14452821e9be/flags/4x3/${language === "en" ? "de" : "us"}.svg`} />
              </>
            </button>
            <FontAwesomeIcon icon={faAngleDown} className="introduction-icon" />
          </div>
          
        </header>
      </section>

      {/* Project section */}
      <section className='project-section'>
        {dummyData.projects.map(item => {
          return(
            <div className='project-wrapper flex-container center column' key={item.title}>
              <h2> {item.title} </h2>
              <div className='flex-container project row'>
                <Carousel images={item.images} />
                <div className='description'>
                  <div dangerouslySetInnerHTML={markdown(item.description[language])} />
                  <div className='flex-container center'>
                    {item.demo && <a href={item.demo} className='btn primary-btn' aria-label={`Demo of ${item.title}`} >Demo </a>}
                    <a href={item.gitHub} className='btn' aria-label={`Repository of ${item.title}`}> Github </a>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </section>

      {/* About me section */}
      <div className='flex-container about-me-contact-wrapper'>
        <section className='about-me-section'>
          <header>
            <div className='flex-container column center'>
              <h2>About me: </h2>
            </div>
          </header>
            <p>
              {dummyData.aboutMe[language]}
            </p>
        </section>
        <section className='contact-section'>
          <header>
            <div className='flex-container column center '>
              <h2>Contact: </h2>
            </div>
            <address>
              <p>{dummyData.contact.mail[language]} <a href="mailto:webmaster@example.com">tomschuelke773@gmail.com</a></p>
            </address>
          </header>
        </section>
      </div>
    </div>
  );
}

export default App;