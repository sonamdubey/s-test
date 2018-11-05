import React, { Component } from 'react';


const headingsArray = [0, 1, 3, 5];
class Carousel extends Component {
    constructor(props) {
		super(props)
        this.state = {
        selected: 0,

        images: [
            "https://s3.us-east-2.amazonaws.com/dzuz14/thumbnails/aurora.jpg",
            "https://s3.us-east-2.amazonaws.com/dzuz14/thumbnails/canyon.jpg",
            "https://s3.us-east-2.amazonaws.com/dzuz14/thumbnails/city.jpg",
            "https://s3.us-east-2.amazonaws.com/dzuz14/thumbnails/desert.jpg",
            "https://s3.us-east-2.amazonaws.com/dzuz14/thumbnails/mountains.jpg",
            "https://s3.us-east-2.amazonaws.com/dzuz14/thumbnails/redsky.jpg",
            "https://s3.us-east-2.amazonaws.com/dzuz14/thumbnails/sandy-shores.jpg",
            "https://s3.us-east-2.amazonaws.com/dzuz14/thumbnails/tree-of-life.jpg"
        ],
        currentIndex: 0,
        translateValue: 0
        }
    }
    handleChange=(e)=> {
    this.setState({selected: e.target.value,translateValue: 0, currentIndex: 0})
  }

  goToPrevSlide = () => {
    if(this.state.currentIndex === 0)
      return;
    
    this.setState(prevState => ({
      currentIndex: prevState.currentIndex - 1,
      translateValue: prevState.translateValue + this.slideWidth()
    }))
  }

  goToNextSlide = () => {
    if(this.state.currentIndex === this.state.selected - 1) {
      return this.setState({
        currentIndex: 0,
        translateValue: 0
      })
    }
    this.setState(prevState => ({
      currentIndex: prevState.currentIndex + 1,
      translateValue: prevState.translateValue + -(this.slideWidth())
    }));
  }

  slideWidth = () => {
     return document.querySelector('.slide').clientWidth
  }

  getNumber = () => {
    alert('selected number is '+this.state.selected)
  }
    render() {
        var count = this.state.selected
    const btnClass=this.state.selected === 0 ? 'hide' : 'btn';
    return (
      <div className="App">
          <span className="select-label">select the number: </span>
        <select onChange={this.handleChange}>
          {headingsArray.map((number, index) => <option key={index} value={number}>{number}</option>)}
        </select>


        <div className={this.state.selected !== 0 ? 'slider' : 'hide'}>

          <div className="slider-wrapper"
            style={{
              transform: `translateX(${this.state.translateValue}px)`,
              transition: 'transform ease-out 0.45s'
            }}>
              {
                this.state.images.slice(0, count).map((image, i) => (
                  <Slide key={i} image={image} />
                ))
              }
          </div>

          <LeftArrow
          goToPrevSlide={this.goToPrevSlide}
          />

          <RightArrow
          goToNextSlide={this.goToNextSlide}
          />
        </div>



        <div className={btnClass} onClick={this.getNumber}>
            Get Number
        </div>
      </div>
    );
    }
}

const Slide = ({ image }) => {
  const styles = {
    backgroundImage: `url(${image})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '50% 60%'
  }
  return <div className="slide" style={styles}></div>
}


const LeftArrow = (props) => {
  return (
    <div className="backArrow arrow" onClick={props.goToPrevSlide}>
        &#x2190;
    </div>
  );
}


const RightArrow = (props) => {
  return (
    <div className="nextArrow arrow" onClick={props.goToNextSlide}>
        &#8594;
    </div>
  );
}


export default (Carousel);