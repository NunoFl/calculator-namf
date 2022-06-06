import "./styles.css";

export default function App() {
  // 👇️ Get current Year
  const date = new Date().getFullYear();
  // 👇️ Get year of specific date

  //base_params
  const base_params = {
    props: {
      //de
      base: 0.2,
      spec1: 1.5,
      //up
      spec3: 0.15
    }
  };
  //query
  const query = {
    props: {
      startValue: 10000,
      statedValue: 6600,
      year: 2012,
      km: 25000,
      status: 1
    }
  };

  let diffYear = date - query.props.year;

  // Base Devalue
  function calcBaseDeval(baseDeval) {
    //get year deval value
    console.log("diffYear", diffYear);
    if (diffYear >= 1) {
      baseDeval = base_params.props.base * diffYear;
    } else if (diffYear === 0) {
      baseDeval = base_params.props.base * diffYear + 1;
    }
    return baseDeval;
  }

  //Year Devaluation Step 1
  function calcDevalAge(devalueAgeIndex) {
    if (diffYear < 10) {
      return (devalueAgeIndex = 550);
    }
    if (diffYear >= 11 && diffYear < 15) {
      return (devalueAgeIndex = 350);
    }
    if (diffYear >= 16) {
      return (devalueAgeIndex = 250);
    }
  }
  //Year Devaluation Step 2
  function yearDeval(deval, deval_, param1) {
    //get year deval value multiplier if vehicle is under 5y rule
    //based on excel L10*((L9*M9)*0.2)

    console.log("deval", deval);

    if (diffYear < 2) {
      deval_ =
        calcDevalAge() * (diffYear * (diffYear / 4.5)) * base_params.props.base;
      param1 = Math.floor(deval_);
      //return clean integer
      return param1;
    } else if (diffYear >= 2 && diffYear < 5) {
      deval_ =
        calcDevalAge() * (diffYear * (diffYear / 3.5)) * base_params.props.base;
      param1 = Math.floor(deval_);
      //return clean integer
      return param1;
    } else if (diffYear >= 5 && diffYear < 15) {
      deval_ =
        calcDevalAge() * (diffYear * (diffYear / 2.1)) * base_params.props.base;
      param1 = Math.floor(deval_);
      return param1;
    } else if (diffYear >= 15) {
      deval_ =
        calcDevalAge() * (diffYear * (diffYear / 1.5)) * base_params.props.base;
      param1 = Math.floor(deval_);
      return param1;
    }
  }

  function kmDeval() {
    let km_dec = query.props.km / 10000;
    let deval_km_multiplier = km_dec < 5 ? 5 : 25;
    let deval_km = deval_km_multiplier * (km_dec * 1.5);
    console.log("deval km", deval_km);
    return deval_km;
  }

  function calcFullDeval(fullDeval) {
    //sum all data
    return (fullDeval = calcBaseDeval() + yearDeval() + kmDeval());
  }
  //iteration with classic status || ages over 20+ years condition
  function calcResult(result1, result2, result3) {
    let bonus = 0.3 * query.props.startValue;
    //collection vehicle
    if (diffYear >= 25 && query.props.status === 1) {
      return (result1 = calcFullDeval() - query.props.startValue + bonus);
    } else {
      //=SUM((F4*K9)+L10*((L9*M9)*0.2)+L10*((L9*N9*0))+O10*(O9*1.5))
      //
      return (result2 = query.props.startValue - calcFullDeval());
    }
  }

  function calcResult_it_1(val) {
    return (
      // calcBaseDeval() +
      // yearDeval() * (yearDeval() * base_params.props.base) +
      query.props.startValue -
      (calcFullDeval() - query.props.startValue / kmDeval())
    );
  }

  return (
    <div className="App">
      <h1>Showing Data</h1>
      <h2>Result</h2>
      <hr />
      <div>
        <h2>
          Data from query
          <br />
        </h2>
        <span>
          <b>Dates</b>
          {query.props.year} | {date} ; <b>km</b> {query.props.km};
          <b> original € </b>
          {query.props.startValue}
        </span>
        <hr />
        <h2>Data from functions</h2>
        {/* <b>calcDevalAge:{calcDevalAge()}</b> */}
        <h3>
          Age: <span style={{ color: "red" }}>{diffYear}</span>
        </h3>
        {/* <h3> yearDevalValue: {yearDeval()}</h3>
        <h4> calcBaseDeval: {calcBaseDeval()}</h4> */}
        {/* <hr />
        <h5 style={{ color: "gray" }}>{calcFullDeval()}</h5>
        <hr /> */}
        Current Value of Vehicle
        <h2>{calcResult()}</h2>
        ...
        <h2>{calcResult_it_1()}</h2>
      </div>
    </div>
  );
}
