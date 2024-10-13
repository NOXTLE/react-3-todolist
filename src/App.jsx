import React, { useState } from "react";
import "./App.css";
export default function App() {
  const [task, setTask] = useState([]);
  const [data, setData] = useState("");
  const [editdata, setedit] = useState("");
  function add() {
    if (data.length < 1) {
      return;
    }
    var obj = {
      id: Date.now(),
      task: data,
      iscom: false,
      edit: false,
    };
    setTask((prev) => {
      return [...prev, obj];
    });
    setData("");
    document.getElementById("ip").value = "";
  }
  return (
    <div id="page">
      <br></br>
      <h1 style={{ textAlign: "center", color: "white" }}>To Do List </h1>
      <div id="usr">
        <input
          id="ip"
          placeholder="enter task"
          onChange={(e) => {
            setData(e.target.value);
          }}
          onKeyDown={(k) => {
            if (k.key == "Enter") {
              add();
            }
          }}
        ></input>
        <button
          id="add"
          onClick={() => {
            add();
            // alert(task.length);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#e8eaed"
          >
            <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
          </svg>
        </button>
      </div>

      <br></br>

      {task.toReversed().map((e) => {
        return (
          <div
            id="tile"
            style={{
              backgroundColor: e.iscom ? "springgreen" : "white",
            }}
          >
            <input
              id="chk"
              type="checkbox"
              checked={e.iscom}
              onChange={() => {
                var arr = task.map((i) => {
                  if (e.id == i.id) {
                    return { ...i, iscom: !i.iscom };
                  } else {
                    return i;
                  }
                });
                setTask(arr);
              }}
            ></input>

            <div className={e.iscom ? "chk" : ""} id="text">
              <div id="txt">
                {e.edit == false && <div>{e.task}</div>}
                <input
                  id="edit"
                  style={{ display: e.edit ? "flex" : "none" }}
                  onChange={(i) => {
                    setedit(i.target.value);
                  }}
                  value={editdata}
                  onKeyDown={(k) => {
                    if (k.key == "Enter") {
                      var arr = task.map((val) => {
                        if (val.id == e.id) {
                          return {
                            id: e.id,
                            task: editdata,
                            iscom: e.iscom,
                            edit: false,
                          };
                        } else {
                          return val;
                        }
                      });
                      setedit("");
                      setTask(arr);
                    }
                  }}
                ></input>
                <div id={e.iscom ? "line" : ""}></div>
              </div>
            </div>

            {/* delete button */}
            <div id="btn-grp">
              {" "}
              <button
                style={{ display: e.edit ? "none" : "flex" }}
                onClick={() => {
                  setedit(e.task);
                  var arr = task.map((i) => {
                    if (e.id == i.id) {
                      return { ...i, edit: !e.edit };
                    } else {
                      return i;
                    }
                  });

                  setTask(arr);
                  console.log(e);
                }}
              >
                Edit
              </button>
              <button
                style={{
                  backgroundColor: e.iscom ? "green" : "red",
                  display: e.edit ? "none" : "flex",
                }}
                onClick={() => {
                  var dataarr = task.filter((i) => {
                    if (i.id != e.id) {
                      return i;
                    }
                  });

                  setTask(dataarr);
                  alert("task deleted");
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#e8eaed"
                >
                  <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                </svg>
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
