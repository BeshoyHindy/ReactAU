import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import { SpecTbl }  from './Spec';
import { SortableTbl }  from '../../Shared/SortableTbl';
import {CustomDownloadTd} from '../../Shared/Shared';


const DetailsTab = (props) => (
	<Tabs selectedIndex={0}	>
		<TabList>
			{	props.data.member && (	<Tab>Standard Package</Tab> ) }
			{	props.data.optional && (<Tab>Optinal Package</Tab> ) }
			{	props.data.spec && (	<Tab>Specification</Tab> ) }
			{	props.data.docs && (	<Tab>Download</Tab> ) }
		</TabList>

		{
			props.data.member && (
				<TabPanel>
					<div className="download-tbl">		
						<SortableTbl tblData={props.data.member} tHead={["Description","Qty"]} dKey={["desc","qty"]} />
					</div>
				</TabPanel>
			)
		}

		{
			props.data.optional && (
				<TabPanel>
					<div className="download-tbl">		
						<SortableTbl tblData={props.data.optional}  tHead={["Optional Member"]}  dKey={["desc"]} />
					</div>
				</TabPanel>
			)
		}

		{
			props.data.spec && (
				<TabPanel>
					<SpecTbl data={props.data.spec}/>
				</TabPanel>
			)
		}

		{
			props.data.docs && (
				<TabPanel>
					<div className="download-tbl">
						<SortableTbl tblData={props.data.docs}
							tHead={["Description","Size(KB)","File Type","Download"]}
							customTd={[{custd: CustomDownloadTd, keyItem: "src"}]}
							dKey={["desc","size","filetype", "src"]} />
					</div>
				</TabPanel>
			)
		}
	</Tabs>
);
DetailsTab.propTypes = {
	data: React.PropTypes.object
};

export {DetailsTab};
