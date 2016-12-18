import {Link} from 'react-router';
import React from 'react';
import {IntercomProductTblImageComponent, NvrProductTblImageComponent, AlarmProductTblImageComponent, CctvProductTblImageComponent
	, DvrProductTblImageComponent, KitProductTblImageComponent} from '../components/Shared/Shared';

const AlarmMetadata = [
				{
								"columnName": "imageUrl",
								"order": 1,
								"locked": true,
								"visible": true,
								"customComponent": AlarmProductTblImageComponent,
								"displayName": "Image",
								"sortable": false,
								"cssClassName": "tblImage"
				}, {
								"columnName": "brand",
								"order": 2,
								"locked": false,
								"visible": true,
								"sortable": true,
								"displayName": "Brand"
				}, {
								"columnName": "name",
								"order": 3,
								"locked": false,
								"visible": true,
								"sortable": true,
								"displayName": "Model"
				}, {
								"columnName": "channel",
								"order": 4,
								"locked": false,
								"visible": true,
								"sortable": true,
								"displayName": "Channel"
				}, {
								"columnName": "remote",
								"order": 5,
								"locked": false,
								"visible": true,
								"sortable": true,
								"displayName": "Remote View"
				}, {
								"columnName": "compression",
								"order": 6,
								"locked": false,
								"visible": true,
								"sortable": true,
								"displayName": "Compression"
				}, {
								"columnName": "videoout",
								"order": 7,
								"locked": false,
								"visible": true,
								"sortable": true,
								"displayName": "Video Output"
				}, {
								"columnName": "id",
								"order": 8,
								"locked": true,
								"visible": false,
								"displayName": ""
				}
];

const KitMetadata = [
				{
								"columnName": "imageUrl",
								"order": 1,
								"locked": true,
								"visible": true,
								"customComponent": KitProductTblImageComponent,
								"displayName": "Image",
								"sortable": false,
								"cssClassName": "tblImage"
				}, {
								"columnName": "brand",
								"order": 2,
								"locked": false,
								"visible": true,
								"sortable": true,
								"displayName": "Brand"
				}, {
								"columnName": "type",
								"order": 3,
								"locked": false,
								"visible": true,
								"sortable": true,
								"displayName": "System"
				}, {
								"columnName": "name",
								"order": 4,
								"locked": false,
								"visible": true,
								"sortable": true,
								"displayName": "Model"
				}, {
								"columnName": "channel",
								"order": 5,
								"locked": false,
								"visible": true,
								"sortable": true,
								"displayName": "Channel"
				}, {
								"columnName": "remote",
								"order": 6,
								"locked": false,
								"visible": true,
								"sortable": true,
								"displayName": "Remote View"
				}, {
								"columnName": "backup",
								"order": 7,
								"locked": false,
								"visible": true,
								"sortable": true,
								"displayName": "Backup"
				}, {
								"columnName": "PoEport",
								"order": 8,
								"locked": false,
								"visible": true,
								"sortable": true,
								"displayName": "PoE Port"
				}, {
								"columnName": "videoout",
								"order": 9,
								"locked": false,
								"visible": true,
								"sortable": true,
								"displayName": "Video Output"
				}, {
								"columnName": "id",
								"order": 10,
								"locked": true,
								"visible": false,
								"displayName": ""
				}
];

const DvrMetadata = [
				{
								"columnName": "imageUrl",
								"order": 1,
								"locked": true,
								"visible": true,
								"customComponent": DvrProductTblImageComponent,
								"displayName": "Image",
								"sortable": false,
								"cssClassName": "tblImage"
				}, {
								"columnName": "brand",
								"order": 2,
								"locked": false,
								"visible": true,
								"sortable": true,
								"displayName": "Brand"
				}, {
								"columnName": "type",
								"order": 3,
								"locked": false,
								"visible": true,
								"sortable": true,
								"displayName": "System"
				}, {
								"columnName": "name",
								"order": 4,
								"locked": false,
								"visible": true,
								"sortable": true,
								"displayName": "Model"
				}, {
								"columnName": "channel",
								"order": 5,
								"locked": false,
								"visible": true,
								"sortable": true,
								"displayName": "Channel"
				}, {
								"columnName": "remote",
								"order": 6,
								"locked": false,
								"visible": true,
								"sortable": true,
								"displayName": "Remote View"
				}, {
								"columnName": "backup",
								"order": 7,
								"locked": false,
								"visible": true,
								"sortable": true,
								"displayName": "Backup"
				}, {
								"columnName": "videoout",
								"order": 8,
								"locked": false,
								"visible": true,
								"sortable": true,
								"displayName": "Video Output"
				}, {
								"columnName": "id",
								"order": 9,
								"locked": true,
								"visible": false,
								"displayName": ""
				}
];

const CctvMetadata = [
				{
								"columnName": "imageUrl",
								"order": 1,
								"locked": true,
								"visible": true,
								"customComponent": CctvProductTblImageComponent,
								"displayName": "Image",
								"sortable": false,
								"cssClassName": "tblImage"
				}, {
								"columnName": "brand",
								"order": 2,
								"locked": false,
								"visible": true,
								"sortable": true,
								"displayName": "Brand"
				}, {
								"columnName": "type",
								"order": 3,
								"locked": false,
								"visible": true,
								"sortable": true,
								"displayName": "System"
				}, {
								"columnName": "name",
								"order": 4,
								"locked": false,
								"visible": true,
								"sortable": true,
								"displayName": "Model"
				}, {
								"columnName": "sensor",
								"order": 5,
								"locked": false,
								"visible": true,
								"sortable": true,
								"displayName": "Sensor"
				}, {
								"columnName": "resolution",
								"order": 6,
								"locked": false,
								"visible": true,
								"sortable": true,
								"displayName": "Resolution"
				}, {
								"columnName": "lens",
								"order": 7,
								"locked": false,
								"visible": true,
								"sortable": true,
								"displayName": "Lens"
				}, {
								"columnName": "ir",
								"order": 8,
								"locked": false,
								"visible": true,
								"sortable": true,
								"displayName": "IR"
				}, {
								"columnName": "feature",
								"order": 9,
								"locked": false,
								"visible": true,
								"sortable": true,
								"displayName": "Feature"
				}, {
								"columnName": "io",
								"order": 10,
								"locked": false,
								"visible": true,
								"sortable": true,
								"displayName": "Indoor Outdoor"
				}, {
								"columnName": "id",
								"order": 11,
								"locked": true,
								"visible": false,
								"displayName": ""
				}
];

const IntercomMetadata = [
				{
								"columnName": "imageUrl",
								"order": 1,
								"locked": true,
								"visible": true,
								"customComponent": IntercomProductTblImageComponent,
								"displayName": "Image",
								"sortable": false,
								"cssClassName": "tblImage"
				}, {
								"columnName": "brand",
								"order": 2,
								"locked": false,
								"visible": true,
								"sortable": true,
								"displayName": "Brand"
				}, {
								"columnName": "name",
								"order": 3,
								"locked": false,
								"visible": true,
								"sortable": true,
								"displayName": "Model"
				}, {
								"columnName": "desc",
								"order": 4,
								"locked": false,
								"visible": true,
								"sortable": true,
								"displayName": "Description"
				}, {
								"columnName": "id",
								"order": 5,
								"locked": true,
								"visible": false,
								"displayName": ""
				}
];

const Metadata = {
				DVR: DvrMetadata,
				NVR: DvrMetadata,
				KIT: KitMetadata,
				CCTV: CctvMetadata,
				ALARM: AlarmMetadata,
				INTERCOM: IntercomMetadata
}

export {Metadata};
