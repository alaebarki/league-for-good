import React from 'react';
import PropTypes from 'prop-types';
import { cssDashboard } from '../../../style';
import DetailsLink from './links/playerDetailsLink.jsx';
import EditLink from './links/playerEditLink.jsx';

import { get as getObjProp } from 'lodash';
// All player data passed from the reducers is reformatted here so it
// contains the correct values for the TableTemplate component

// Column headers and data
export const colData = [
	{
		label: 'Last Name',
		cellProp: 'lastName',
		sortable: true,
		searchable: true
	},
	{
		label: 'First Name',
		cellProp: 'firstName',
		sortable: true
	},
	{
		label: 'Email',
		cellProp: 'email',
		sortable: true
	},
	{
		label: 'Edit',
		style: cssDashboard.table.columns.icon,
		cellProp: 'link',
		action: 'editPlayer'
	},
	{
		label: 'View',
		style: cssDashboard.table.columns.icon,
		action: 'viewPlayer',
		cellProp: 'link'
	}
];

const Link = ({action, player}) => {
	if (action === 'editPlayer') {
		return <EditLink player={player}/>;
	}	else {
		return <DetailsLink {...player}/>;
	}
};

Link.propTypes = {
	action: PropTypes.string,
	player: PropTypes.object
};

// Get the value for the cell
function getCellValue(player, prop, action) {
	if (prop !== 'link') {
		return getObjProp(player, prop);
	}	else {
		const linkProps = { player, action };
		return <Link {...linkProps} />;
	}
}

// Massage the data for the table body
const getPlayerTableData = (players) => {
	// map each row
	return players.map( player => {
		// map each cell
		return colData.map( ({cellProp, action, style}) => (
			{
				value: getCellValue(player, cellProp, action),
				style: style
			}
		));
	});
};

export default getPlayerTableData;
