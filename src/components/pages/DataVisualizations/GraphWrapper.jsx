import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import CitizenshipMapAll from './Graphs/CitizenshipMapAll';
import CitizenshipMapSingleOffice from './Graphs/CitizenshipMapSingleOffice';
import TimeSeriesAll from './Graphs/TimeSeriesAll';
import OfficeHeatMap from './Graphs/OfficeHeatMap';
import TimeSeriesSingleOffice from './Graphs/TimeSeriesSingleOffice';
import YearLimitsSelect from './YearLimitsSelect';
import ViewSelect from './ViewSelect';
import axios from 'axios';
import {
  setVisualizationData,
  resetVisualizationQuery,
  setHeatMapYears,
} from '../../../state/actionCreators';
// import test_data from '../../../data/test_data.json';
import { colors } from '../../../styles/data_vis_colors';
import ScrollToTopOnMount from '../../../utils/scrollToTopOnMount';

const API_URL = 'https://hrf-asylum-be-b.herokuapp.com/cases';
const { background_color } = colors;

function GraphWrapper(props) {
  const { set_view, dispatch } = props;
  let { office, view } = useParams();

  useEffect(() => {
    if (view === 'time-series' && !office) {
      fetchData()
        .then(result => {
          console.log('API Response:', result.data);
          dispatch(setVisualizationData, (view, office, result.data));
        })
        .catch(err => {
          console.error(err);
        });
    }
  }, [dispatch, office, view]);

  let map_to_render;
  if (!office) {
    switch (view) {
      case 'time-series':
        map_to_render = <TimeSeriesAll />;
        break;
      case 'office-heat-map':
        map_to_render = <OfficeHeatMap />;
        break;
      case 'citizenship':
        map_to_render = <CitizenshipMapAll />;
        break;
      default:
        break;
    }
  } else {
    switch (view) {
      case 'time-series':
        map_to_render = <TimeSeriesSingleOffice office={office} />;
        break;
      case 'citizenship':
        map_to_render = <CitizenshipMapSingleOffice office={office} />;
        break;
      default:
        break;
    }
  }

  const fetchData = (from, to, office) => {
    let params = {
      from: from || 2015,
      to: to || new Date().getFullYear(),
    };

    if (office) {
      params.office = office;
    }

    return axios.get(`${API_URL}/fiscalSummary`, { params });
  };

  function updateStateWithNewData(years, view, office) {
    fetchData(years[0], years[1], office)
      .then(result => {
        console.log('API Response:', result.data);
        dispatch(setVisualizationData(view, office, result.data));
      })
      .catch(err => {
        console.error(err);
      });
  }

  const clearQuery = (view, office) => {
    dispatch(resetVisualizationQuery(view, office));
  };

  return (
    <div
      className="map-wrapper-container"
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        minHeight: '50px',
        backgroundColor: background_color,
      }}
    >
      <ScrollToTopOnMount />
      {map_to_render}
      <div
        className="user-input-sidebar-container"
        style={{
          width: '300px',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <ViewSelect set_view={set_view} />
        <YearLimitsSelect
          view={view}
          office={office}
          clearQuery={clearQuery}
          updateStateWithNewData={updateStateWithNewData}
        />
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  setVisualizationData: state.vizData?.timeSeriesAllData,
});

export default connect(mapStateToProps)(GraphWrapper);
