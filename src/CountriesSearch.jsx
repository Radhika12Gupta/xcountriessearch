import React, { useEffect, useState } from 'react'
import styles from './CountriesSearch.module.css'
import axios from 'axios'

const CountriesSearch = () => {
    const [data,setData]=useState([])
    const [searchVal,setSearch]=useState('')
    const [filteredData,setFilteredData]=useState([])
    const [timerId,setTimerId]=useState(null)

    useEffect(()=>{
      fetchData()
    },[])

    const fetchData=async()=>{
      try{
        let res=await axios.get(' https://restcountries.com/v3.1/all')
      let data=res.data
      setData(data)
      setFilteredData(data)
      }
      catch(err){
        console.log(err)
      }
    }

    const debounceSearch =(event, debounceTimeout) => {
        const value=event.target.value
        setSearch(event.target.value)
        let timer= setTimeout(()=>{
            if (value === "") { setFilteredData(data); return; }
            const filterBySearch = data.filter(
                country => {
                  return (
                    country.name.common
                    .toLowerCase()
                    .includes(value.toLowerCase()) 
                  );
                }
              );
        setFilteredData(filterBySearch)
    },500);
         setTimerId(timer)
     
    }

    useEffect(()=>{
        return ()=>{
          clearTimeout(timerId)
        }
      },[timerId])

  return (
    <div>
      <input type="text" placeholder='Search for Countries...' onChange={(e)=> 
       { 
        debounceSearch(e,timerId)
        }
        } value={searchVal}/>
      <div className={styles.gridContainer}>
    {filteredData.length ? filteredData.map((item, index) => (
    <div className={styles.griditem}>
      <div className={styles.countryCard}>
            <div className={styles.card}>
                    <img src={item.flags.png} alt={item.flags.alt} className={styles.cardimg}/>  
                    </div>
                    <div>
                      <h2>{item.name.common}</h2>
                    </div>
                    </div>
    </div>
  )): null } 
    </div>
    </div>
  )
}

export default CountriesSearch
