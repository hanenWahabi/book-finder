import React, { Component } from 'react';
import './App.css';

const data2 = [
  [{
    volumeInfo: {
      authors: ["Tristan Jones"],
      description: "When the Royal Navy discharged Tristan Jones and told him he was physically unfit for seafaring, he got hold of a small craft, converted it to a cruising ketch, and kicked away from shore. Determined to sail farther north than anyone else, he set out from Iceland accompanied only by his dog, Nelson. For two winters he endured constant danger in bleak polar regions. He survived violent snowstorms, a ravenous polar bear, and getting stranded on an ice pack in the Arctic Ocean, all while grappling with loneliness, despair, and dwindling supplies. Then the ice shifted, crushing his boat like a matchbox, and he came face-to-face with cold oblivion...",
      imageLinks: {
        smallThumbnail: "http://books.google.com/books/content?id=UOEWlpeZ7…=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
        thumbnail: "http://books.google.com/books/content?id=Aaug_RnI-xQC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
      },
      infoLink: "http://books.google.com/books?id=UOEWlpeZ708C&dq=ice&hl=&source=gbs_api",
      title: "Ice1!",
      publisher: "Sheridan House, Inc."
    }
  },
  {
    volumeInfo: {
      authors: ["Tristan Jones"],
      description: "When the Royal Navy discharged Tristan Jones and told him he was physically unfit for seafaring, he got hold of a small craft, converted it to a cruising ketch, and kicked away from shore. Determined to sail farther north than anyone else, he set out from Iceland accompanied only by his dog, Nelson. For two winters he endured constant danger in bleak polar regions. He survived violent snowstorms, a ravenous polar bear, and getting stranded on an ice pack in the Arctic Ocean, all while grappling with loneliness, despair, and dwindling supplies. Then the ice shifted, crushing his boat like a matchbox, and he came face-to-face with cold oblivion...",
      imageLinks: {
        smallThumbnail: "http://books.google.com/books/content?id=UOEWlpeZ7…=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
        thumbnail: "http://books.google.com/books/content?id=Aaug_RnI-xQC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
      },
      infoLink: "http://books.google.com/books?id=UOEWlpeZ708C&dq=ice&hl=&source=gbs_api",
      title: "Ice2!",
      publisher: "Sheridan House, Inc."
    }
  },
  {
    volumeInfo: {
      authors: ["Tristan Jones"],
      description: "When the Royal Navy discharged Tristan Jones and told him he was physically unfit for seafaring, he got hold of a small craft, converted it to a cruising ketch, and kicked away from shore. Determined to sail farther north than anyone else, he set out from Iceland accompanied only by his dog, Nelson. For two winters he endured constant danger in bleak polar regions. He survived violent snowstorms, a ravenous polar bear, and getting stranded on an ice pack in the Arctic Ocean, all while grappling with loneliness, despair, and dwindling supplies. Then the ice shifted, crushing his boat like a matchbox, and he came face-to-face with cold oblivion...",
      imageLinks: {
        smallThumbnail: "http://books.google.com/books/content?id=UOEWlpeZ7…=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
        thumbnail: "http://books.google.com/books/content?id=Aaug_RnI-xQC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
      },
      infoLink: "http://books.google.com/books?id=UOEWlpeZ708C&dq=ice&hl=&source=gbs_api",
      title: "Ice3!",
      publisher: "Sheridan House, Inc."
    }
  }]
]

class App extends Component {
  state = {
    inputValue: "",
    data: [],
    empty: "",
    error: ""
  }

  renderListView() {
    this.setState({ data: [] })
    let main_array = [];
    let inner = []
    const url = `https://www.googleapis.com/books/v1/volumes?q=${this.state.inputValue}&key=AIzaSyC5GgyRxeN8zRpP-8OMx5h500CQvqzBCu8`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data.totalItems === 0) {
          this.setState({ empty: "Nothing Found" })
        } else {
          data.items.map((item, index) => {

            if (index % 4 !== 0) {
              inner.push(item)
            } else {
              main_array.push(inner);
              inner = []
            }
            this.setState({ data: main_array })
            return data
          })
        }

      })
      .catch(error => {
        this.setState({ error })
        console.error(error)
      })
  }

  render() {
    const { data } = this.state;
    return (
      <div className="App" style={{ alignItems: 'center' }}>
        <h1 className="header">BOOK FINDER</h1>
        <input type="text" id="myInput" className="input"
          placeholder="Search for book.." value={this.state.inputValue}
          onKeyPress={(event) => {
            if (event.key == 'Enter')
              this.renderListView()
          }}
          onChange={(evt) => {
            this.setState({ error: "", empty: "" })
            this.setState({ inputValue: evt.target.value })
          }} />
        <button className="search" onClick={() => {
          if (this.state.inputValue === "") {
            this.setState({ error: "Please provide a search query first" })
          } else {
            this.renderListView()
          }
        }}>{'Search'}</button>
        <p style={{ color: 'red', fontSize: 14 }}>{this.state.error}</p>
        <h4 style={{ color: '#646464' }}>{this.state.empty}</h4>
        <table className="table" >
          {
            data.map((row, index) => (
              <tr key={index} >
                {row.map(item =>
                  <td className="mainrow">
                    <div className="innerrow">
                      {item.volumeInfo.imageLinks ?
                        <img src={item.volumeInfo.imageLinks.thumbnail} className="thumbnail" /> : null}
                    </div>
                    <p className="title">{item.volumeInfo.title}</p>
                    <p className="description" style={{ fontSize: 13 }}>
                      {"By  item.volumeInfo.authors[0]"}
                    </p>
                    <p className="description" style={{ fontSize: 13 }}>
                      {"Published by " + item.volumeInfo.publisher}
                    </p>
                    <button className="btn" onClick={() => window.open(item.volumeInfo.infoLink)}>{'See this Book'}</button>
                  </td>

                )}
              </tr>
            ))
          }
        </table>
      </div>
    );
  }
}

export default App;
