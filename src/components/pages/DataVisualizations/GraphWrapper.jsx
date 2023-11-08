import React from 'react';
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
import { resetVisualizationQuery } from '../../../state/actionCreators';
//import test_data from '../../../data/test_data.json';
import { colors } from '../../../styles/data_vis_colors';
import ScrollToTopOnMount from '../../../utils/scrollToTopOnMount';

const { background_color } = colors;

function GraphWrapper(props) {
  const { set_view, dispatch } = props;
  let { office, view } = useParams();
  if (!view) {
    set_view('time-series');
    view = 'time-series';
  }

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
  // This is an asynchronous function named 'updateStateWithNewData'.
  // It is designed to fetch new data based on the provided parameters and then use a callback
  // to update the state with this data.
  async function updateStateWithNewData(
    years,
    view,
    office,
    stateSettingCallback
  ) {
    // First, there is a condition that checks if the 'office' is set to 'all' or is not provided.
    if (office === 'all' || !office) {
      // If the condition is true, it proceeds to make two GET requests using axios to fetch data from two different endpoints.
      // Both requests are awaited, meaning the function will pause until both promises are resolved.
      const fiscalSum = await axios.get(
        'https://hrf-asylum-be-b.herokuapp.com/cases/fiscalSummary',
        {
          params: {
            from: years[0], // The 'from' query parameter is set to the first element in the 'years' array.
            to: years[1], // The 'to' query parameter is set to the second element in the 'years' array.
          },
        }
      );
      // The second GET request fetches the citizenship summary data within the same year range.
      const citizenSum = await axios.get(
        'https://hrf-asylum-be-b.herokuapp.com/cases/citizenshipSummary',
        {
          params: {
            from: years[0],
            to: years[1],
          },
        }
      );
      // After the data from both endpoints is fetched, the function adds a new key 'citizenshipResults'
      // to the 'fiscalSummary' object and assigns it the data fetched from the citizenship summary endpoint.
      fiscalSum.data['citizenshipResults'] = citizenSum.data;

      // Finally, the 'stateSettingCallback' function is called with the 'view', 'office', and the modified 'fiscalSummary.data'.
      // This callback is responsible for updating the component's state with the new data.
      stateSettingCallback(view, office, [fiscalSum.data]);
    }
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

export default connect()(GraphWrapper);
