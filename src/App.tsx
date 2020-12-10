import React, { useEffect, useState } from 'react';
import { Option, SelectComponent } from './components/select';
import { Card } from './components/card';
import BaseService from './services/base.service'
import './App.scss';

function App() {

  const base = new BaseService()
  const [launchesList, setlaunchesList] = useState([])
  const [rocketsOptions, setRocketsOptions] = useState<Array<Option>>([])
  const [siteOptions, setSiteOptions] = useState<Array<Option>>([])
  const [rocketFilter, setRocketFilter] = useState('')
  const [siteFilter, setSiteFilter] = useState('')


  const getLaunchesList = async () => {
    const res = await base.getJSON('https://api.spacexdata.com/v3/launches')
    await setlaunchesList(res)
  }

  const getLaunchesListByFilter= async () => {
    const res = await base.getJSON(`https://api.spacexdata.com/v3/launches?site_id=${siteFilter}&rocket_id=${rocketFilter}`)
    await setlaunchesList(res)
  }

  const getRocketsOptions = (data:  any) => {
    const rockets: Array<any> = []
    data.map((item: any) => {
      const option = {label: item.rocket.rocket_name, value: item.rocket.rocket_id}
      rockets.push(option)
    })
    const uniqueRockets = Array.from( new Set(rockets.map((option: Option) => option.value))).map(value => {
      return rockets.find((option: Option) => option.value === value)
    })
    setRocketsOptions(uniqueRockets)
  }

  const getSiteOptions = (data:  any) => {
    const sites: Array<any> = []
    data.map((item: any,) => {
      const option = {label: item.launch_site.site_name_long, value: item.launch_site.site_id}
      sites.push(option)
    })
    const uniqueSites = Array.from( new Set(sites.map((option: Option) => option.value))).map(value => {
      return sites.find((option: Option) => option.value === value)
    })
    setSiteOptions(uniqueSites)
  }

  useEffect( () => {
    getLaunchesList()
  },[])

  useEffect(() => {
    if(launchesList.length > 0 && !rocketFilter && !siteFilter) {
      getRocketsOptions(launchesList)
      getSiteOptions(launchesList)
    }
  }, [launchesList])

  useEffect(() => {
    getLaunchesListByFilter()
  }, [rocketFilter, siteFilter])

  return (
    <div className="App">
      <div className="body-container">
        <h1 className="body-container__title">
          Launches
        </h1>
        <div>
          <div className="body-container__filters">
            <div className="filter">
              <SelectComponent
                options={siteOptions}
                label="Launch Site"
                onChange={(option: Option) => {setSiteFilter(option.value)}}
              />
            </div>
            <div className="filter">
              <SelectComponent
                options={rocketsOptions}
                label="Rocket"
                onChange={(option: Option) => {setRocketFilter(option.value)}}
              />
            </div>
          </div>
          {launchesList.length > 0 && launchesList.map((item: any) => {
            return  (
              <Card
                name={item.mission_name}
                date={item.launch_date_utc}
                patch={item.links.mission_patch}
                details={item.details}
              />)
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
