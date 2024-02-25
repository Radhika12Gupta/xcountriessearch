import React, { useEffect, useState } from 'react'
import styles from './CountriesSearch.module.css'
import axios from 'axios'

const CountriesSearch = () => {
    const [data,setData]=useState([])
    const [searchVal,setSearch]=useState('')
    const [filteredData,setFilteredData]=useState([])

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
    const handleSearch=(value)=>{
        setSearch(value)
        if (searchVal === "") { setFilteredData(data); return; }
        const filterBySearch = data.filter((item) => {
            if (item.name.common.toLowerCase()
                .includes(searchVal.toLowerCase())) { return item; }
        })
        setFilteredData(filterBySearch)
    }
  return (
    <div>
      <input type="text" placeholder='Search for Countries...' onChange={(e)=>handleSearch(e.target.value)} value={searchVal}/>
      <div className={styles.gridContainer}>
    {filteredData.length ? filteredData.map((item, index) => (
    <div className={styles.griditem}>
      <div className={styles.countryCard}>
            <div className={styles.card}>
                    <img src={item.flags.png} alt={item.flags.alt} className={styles.cardimg}/>  
                    </div>
                    <div>
                      <h4>{item.name.common}</h4>
                    </div>
                    </div>
    </div>
  )): null } 
    </div>
    </div>
  )
}

export default CountriesSearch
