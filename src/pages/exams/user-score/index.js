import React, { useState, useEffect } from "react";
import styles from "../../../styles/user-score.module.css";
import { db } from "../../../../firebase.config";
import { ref, get } from "firebase/database";

function Index() {
  const [scoreContainer, setScoreContainer] = useState([]);
  const [inputEmail, setInputEmail] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dbRef = ref(db, `examResults`);
        const response = await get(dbRef);
        const data = response.val();

        if (data && typeof data === "object") {
          const dataArray = Object.entries(data).map(([key, value]) => ({
            key,
            ...value,
          }));
          setScoreContainer(dataArray);
        } else {
          setScoreContainer([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setScoreContainer([]);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (event) => {
    setInputEmail(event.target.value);
  };

  const handleButtonClick = () => {
    const filtered = scoreContainer.filter((data) =>
      data.email.toLowerCase() === inputEmail.toLowerCase()
    );
    setFilteredResults(filtered);
    setShowResults(true);
  };

  return (
    <>
      <div className={styles.scoreContainer}>
        <div className={styles.scoreContainerHeader}>
          <div className={styles.searchInput}>
            <input
              placeholder="Please Enter your email"
              value={inputEmail}
              onChange={handleInputChange}
            />
            <button onClick={handleButtonClick}>Submit</button>
          </div>
          <h1>Back</h1>
        </div>

        {showResults && (
          <div className={styles.resultsContainer}>
            {filteredResults.length > 0 ? (
              filteredResults.map((data, index) => (
                <div className={styles.tableContainer} key={index}>
                  <div className={styles.tableHeader}>
                    <h1>Quiz</h1>
                    <h1>Scores</h1>
                  </div>
                  <div className={styles.tableColumn}>
                    <h1>1</h1>
                    <h1>{`${data?.score} / ${data?.total}`}</h1>
                  </div>
                </div>
              ))
            ) : (
              <div className={styles.noResults}>
                <h2>No results found</h2>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default Index;
