import './App.css'
import { useEffect, useState } from 'react'

function App() {

  const getRandomNumber = () => {
    return Math.floor(Math.random() * 10 + 1)
  };

  const maxValueRandom = () => {
    let min = 0;
    let max = 10000;
    return Math.floor(Math.random() * (max - min) + min)
  };

  const data = [
    {
      id: 1,
      title: "Real Madrid",
      color: "#E5E2ED",
      textColor: "#EA93AC",
      value: getRandomNumber(),
      maxValue: maxValueRandom()
    },

    {
      id: 2,
      title: "Man City",
      color: "#22343A",
      textColor: "#74C2E8",
      value: getRandomNumber(),
      maxValue: maxValueRandom()
    },

    {
      id: 3,
      title: "Barcelona",
      color: "#A52838",
      textColor: "#142656",
      value: getRandomNumber(),
      maxValue: maxValueRandom()
    },

    {
      id: 4,
      title: "PSG",
      color: "#333C63",
      textColor: "#F3F3F3",
      value: getRandomNumber(),
      maxValue: maxValueRandom()
    },

    {
      id: 5,
      title: "Chelsea",
      color: "#033073",
      textColor: "#DADFE3",
      value: getRandomNumber(),
      maxValue: maxValueRandom()
    }
  ];

  const setBarDataRandom = () => {

    let data = [...barData];

    data.map((item) => {
      console.log(item.value);
      return (item.value += getRandomNumber());
    });
    setBarData(data);

  };

  function compareValues(key, order = 'desc') {

    return function innerSort(a, b) {

      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        return 0;
      };

      const varA = (typeof a[key] === 'string') ? a[key].toUpperCase() : a[key];
      const varB = (typeof b[key] === 'string') ? b[key].toUpperCase() : b[key];

      let comparison = 0;

      if (varA > varB) {
        comparison = 1;
      }
      else if (varA < varB) {
        comparison = -1;
      }
      return (
        (order === 'desc') ? (comparison * -1) : comparison
      );

    };

  };


  useEffect(() => {

    const arr = [...barData];
    let timer;

    timer = setInterval(() => {

      arr.forEach((item, index) => {

        if (item.value > item.maxValue) {
          let data = [...barData];
          data.map((item) => {
            return (item.value = item.maxValue);
          });
          setBarData(data);
          clearInterval(timer);
        }
        else {
          setBarDataRandom();
        }

      });

    }, 200);

  }, []);

  const [barData, setBarData] = useState(data);

  /*return <div className="App">{(JSON.stringify(barData))} </div>*/


  return (
    <div className="App">

      <h1>React Competing Bars</h1>

      {

        barData.sort(compareValues("value", "desc")).map((item, index) => {

          return (
            <div key={index} className="child" style={{
              backgroundColor: item.color, color: item.textColor, width: item.value >= item.maxValue ? "100%" :
                (item.value * 100) / item.maxValue + "%", transform: `translateY(${index * 110 + 30 + "px"})`
            }}>
              {" Bu ilin güclüləri : " + (index + 1) + " - " + item.title + " " + " - Point : " + item.value}
            </div>
          );

        })

      };

    </div >

  );

};

export default App