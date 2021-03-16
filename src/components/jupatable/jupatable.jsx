import React from 'react';
import FA from './tableIcons';
import { ttext } from '../configTranslate';
import { BS_THEAD_STYLE, BS_TABLE_RESPONSIVE, BS_TABLE_STRIPED, BS_TABLE_BORDERED, 
    BS_TABLE_HOVERABLE, BS_TABLE_SMALLER, BS_TABLE_COLORSET} from './bsTableConstant.js';
import { toast } from "react-toastify";


/* 
const SAMPLE_COL_DATA = [
            {   colTitle: " שם הילד",   colIndex: 2,   isEditable: true, refName:"childName", sortable: false },
            {   colTitle: " שם משפחה",   colIndex: 3,   isEditable: false, refName:"childLastName", sortable: false },
            {   colTitle: "גיל ",   colIndex: 4,   isEditable: true,   refName:"age", sortable: false },
            ];
const SAMPLE_ROW_DATA = [
            ["liber","1ty",9],
            ["liber","t2y",9],
            ["li3ber","ty",6],
            ["lib4er","ty",9]
        ]; */
export default class Jupatable extends React.Component {
    constructor(props){
        super();        
        this.tableName=ttext['todoTable'];
        this.tablePrefix="jupaPrefix";
        this.state={
            tableCols:props.COL_DATA,             
            rowsData:props.ROW_DATA , 
            rowsDataHistory: [],
            tableDirectionRTL: true,    
            bootstrapStyle: {
                captionString: this.tableName,
                caption: true,
                responsive: true, 
                withRowNumber: true,
                theadStyle: 1, // [0 : none , 1 : thead-light , 2 : thead-dark]
                zebraRows: true,
                bordered: true,
                hoverable: true,
                smaller: true,
                tableColorSet: 3, // 0 - 9;
                editableRowColor: 4, // 0-9 see documentation
            },
            actionsApplied : {
                delete: false,
                modify: true,
                addSameRow: true,
            },
            extentionStyle:{
                selectRecordsAmounsPerPage: false,
                pagination: false,
                recordsPerPage: 10,
                primarySort: true,
                primarySortByColNum: 1,
                secondarySort:false,
                secondarySortByColNum: 1,
                tableFooter: true,
                footerData: { 0: "records amount on display", 1: "records amount in database"  },
                responsiveSearch: true,
                filteredSearch: false,
                showFilterAsSearchExtention: false,
            },
            editModeConsoleWarning: false,
            editModeRowsStatus: [],
            searchView: true,
            searchTemp: props.ROW_DATA,
            sortableOn: true,
            sortToggle: true,
            
                    
        };        
    } // [-- construdtor Ends here --]
    /* componentWillMount=()=>{ // this is going to be depracated in future so i moved things to componentdidmount hope no bugs
        let rowEditStatus = this.state.rowsData.map(i=>false);
        console.log('mutate',rowEditStatus);
        console.log('curstate',this.state.editModeRowsStatus);
        this.setState({editModeRowsStatus:[...rowEditStatus]});
    } */
    
    componentDidMount = () => {       
        let rowEditStatus = this.state.rowsData.map(i=>false);
        this.setState({editModeRowsStatus:[...rowEditStatus]});    
    }
    componentDidUpdate = (prevProps,prevState) => {
        console.log('iseditmode on',this.isEditOn());
        console.log('actions',this.state.actionsApplied);
        console.log('history show',this.state.rowsDataHistory);
        if (this.props.ROW_DATA !== prevProps.ROW_DATA) {
            console.log('props changes from:',prevProps,' to:', this.props);
            this.setState({rowsData: this.props.ROW_DATA});
        }
        if (this.state.rowsData !== prevState.rowsData) {
            this.setState({rowsData: this.state.rowsData});
        }
       


    }
    dataColStructToTable = (data_cols) => {  
        return( <tr>
                { this.state.bootstrapStyle.withRowNumber && <th scope="col" key={this.tableName+"dcstt_col_zero"}> # </th>}
                { data_cols.map((th,idx) => <th scope="col" key={"dcstt_col_"+idx}> {th.colTitle}</th>)}
                </tr>);
    }
    emptyTableEl = () => {
        const _msg_NoDataTable = <React.Fragment>
                <table className="table table-warning">
                    <tbody>
                        <tr><td className="d-flex h4 justify-content-center">WelCome {ttext["welcome"]}</td></tr>
                        <tr><td className="d-flex h4 justify-content-center">{ttext["emptyTable"]}</td></tr>
                    </tbody>
                </table>
            </React.Fragment>;
        return _msg_NoDataTable;
    }

    sortByCol = (colIdx,desc=true) => {
        let rows = [...this.state.rowsData];
        rows.sort((item1,item2)=>{
            if (item1[colIdx]>item2[colIdx]) if (desc) return 1; else return -1 ;
            if (item1[colIdx]<item2[colIdx]) if (desc) return -1; else return 1;
            return 0;
        });
        this.setState({rowsData: rows, sortToggle: !this.state.sortToggle });  

    }
    tableColNamesEl = () => {
        let data_cols=[...this.state.tableCols];
        let last_item = data_cols.pop();  
        let colIdxIcon = {...FA.indexColIcon[0],key:"idxicon"};
        let lastColIcon = {...FA.columnIcon[0],key: this.tablePrefix+last_item.refName+data_cols.length+"ico"};
        let lastColEditableIcon = {...FA.contentEditableIcon[0],key: this.tablePrefix+last_item.refName+data_cols.length+"editable_ico"};
        let lastColSortIcon = {...FA.sortIcon[0], key: this.tablePrefix+last_item.refName+data_cols.length+"sortable_ico"};
    
       
        let jsxEl = <React.Fragment>
            { this.state.bootstrapStyle.withRowNumber ? 
            <th scope="col" key={this.tablePrefix+"tableRoxIdxCol"}>
                {colIdxIcon}
            </th> 
            : <></>}
            { data_cols.map((th,idx) => {
                let colIcon = {...FA.columnIcon[0],key: this.tablePrefix+th.refName+idx+"ico"}
                let colEditableIcon = {...FA.contentEditableIcon[0],key: this.tablePrefix+th.refName+idx+"editable_ico"}
                let colSortIcon = {...FA.sortIcon[0], key: this.tablePrefix+th.refName+idx+"sortable_ico"};
                
                return  (
                    <th key={this.tablePrefix+th.refName+idx} 
                        scope="col"> 
                            {colIcon} 
                            {th.colTitle} 
                            {th.isEditable && colEditableIcon} &nbsp; &nbsp; &nbsp;
                            {th.sortable && this.state.sortableOn && <span onClick={()=>{
                                   this.sortByCol(idx,this.state.sortToggle)
                                
                                }}>{colSortIcon}</span>} 
                    </th>
                )
            }
            )}
            <th key={this.tablePrefix+last_item.refName+data_cols.length}
                    scope="col" 
                    colSpan="2"
                    >
                    {lastColIcon} 
                    {last_item.colTitle} 
                    {last_item.isEditable && lastColEditableIcon}  &nbsp; &nbsp; &nbsp;
                    {last_item.sortable && this.state.sortableOn && <span onClick={()=>{
                                   this.sortByCol(data_cols.length,this.state.sortToggle);
                                
                                }}>{lastColSortIcon}</span> }   
            </th>
            </React.Fragment>;

        return jsxEl; 
        }
        

    tableRows = (rowData) => {
        return (
            <React.Fragment>
                {
                    rowData.map((item,idx) => {
                    return (
                        <tr key={"_row_"+idx} className={  this.state.editModeRowsStatus[idx] ? BS_TABLE_COLORSET[this.state.bootstrapStyle.editableRowColor] : "" }>
                            {this.tableRow(idx,item) }
                        </tr>
                    )
                    })
                }
            </React.Fragment>
        );
    }




    addBtn_delete = (rowidx) => { 
        let fa_icon={...FA.deleteIcon[0],key:this.tablePrefix+"actionDelete"+rowidx};
        return  <button 
                type="button" 
                className={"btn btn-outline-danger ml-1 "+BS_TABLE_COLORSET[this.state.bootstrapStyle.tableColorSet]}
                onClick={()=>{
                    let trowsData = [...this.state.rowsData];
                    let removedItem = trowsData.splice(rowidx, 1);
                    this.setState({
                        rowsData: trowsData,
                        rowsDataHistory: [...this.state.rowsDataHistory,removedItem],
                    });
                }}
                > 
                    {fa_icon} 
                    <span className="sr-only">{ttext["delete"]}</span> 
                </button> 
        };
    addBtn_modify = (rowdata,ridx) => {         
        let fa_edit_icon={...FA.editIcon[0],key:this.tablePrefix+"actionEdit"+ridx};
        let fa_exit_icon={...FA.exitIcon[0], key: this.tablePrefix+"actionCloseEdit"+ridx};
        let editmodestatusarr=[...this.state.editModeRowsStatus];
        return (
        <button
        type="button"  
        className={"btn btn-outline-warning ml-1 "+BS_TABLE_COLORSET[this.state.bootstrapStyle.tableColorSet]}
        onClickCapture={(e)=>{
            e.preventDefault();
            if (this.isEditOn()) {               
                if (editmodestatusarr[ridx]) {
                    editmodestatusarr[ridx]=!editmodestatusarr[ridx];
                    this.setState({ editModeRowsStatus : [...editmodestatusarr] });
                }
                else { toast(ttext["msgOutaEditmod"]); }
            }
            else {         
                editmodestatusarr[ridx]=!editmodestatusarr[ridx];           
                this.setState({  editModeRowsStatus : [...editmodestatusarr]  });
            }
        }}
        >
            { !editmodestatusarr[ridx] && fa_edit_icon }
            { editmodestatusarr[ridx] && fa_exit_icon }  

                   <span className="sr-only">{ttext["edit"]}</span>
               </button> 
        )};        
    addBtn_sameRow = (rowidx) => { 
        let fa_icon={...FA.addIcon[0],key:this.tablePrefix+"actionDuplicate"+rowidx};
        return <button 
                type="button" 
                className={"btn btn-outline-success ml-1 "+BS_TABLE_COLORSET[this.state.bootstrapStyle.tableColorSet]}
                onClick={()=>{
                    let trowsData = [...this.state.rowsData];
                    trowsData.splice(rowidx, 0,[...trowsData[rowidx]]);
                    this.setState({rowsData: trowsData });
                }}
                > 
                    {fa_icon} 
                    <span className="sr-only">{ttext["add"]}</span> 
               </button> 
        };
    
    addBtn_updateEdit = (rowidx) => { 
        let fa_icon={...FA.updateIcon[0],key:this.tablePrefix+"actionEscEdit"+rowidx};
        return <button 
                type="button" 
                className={"btn btn-outline-success ml-1 "+BS_TABLE_COLORSET[this.state.bootstrapStyle.tableColorSet]}
                onClick={()=>{
                    alert("update");
                }}
                > 
                    {fa_icon} 
                    <span className="sr-only">{ttext["update"]}</span> 
               </button> 
        };




    tableRow = (rowidx,dataRow) => {
        let { actionsApplied } = this.state;          
        return (
        <React.Fragment key={"_fg"+rowidx}>
            { this.state.bootstrapStyle.withRowNumber && <th scope="col"> {rowidx+1} </th> }
            {dataRow.map( (item,idx) => <td key={"_row_"+rowidx+"_"+idx}>{item}</td>)} 
            <td key={"_actions"+rowidx} >  
            { (actionsApplied.addSameRow) && (!this.state.editModeRowsStatus[rowidx]) && this.addBtn_sameRow(rowidx)}
            { (actionsApplied.delete) && (!this.state.editModeRowsStatus[rowidx]) && this.addBtn_delete(rowidx)}
            { (actionsApplied.modify) && this.addBtn_modify(dataRow,rowidx)}
            { (actionsApplied.modify) && (this.state.editModeRowsStatus[rowidx]) && this.addBtn_updateEdit(rowidx)}

            </td>                           
        </React.Fragment>
        )
    }
    
    isEditOn = () => { 
        let editmodestatusarr=[...this.state.editModeRowsStatus];
        let xval=false;
        for(let i = 0;i<editmodestatusarr.length;i++){
            xval= xval || editmodestatusarr[i];
        }
        return xval;
    }

    applySearchElem = () => {
        return(
        <p className="rtl bg-success">
          <label className="rtl p-2 m-2">{ttext.searchInTable}</label>
            <input 
                placeholder={ttext.search} 
                type="text"   
                className="m-2 p-2" 
                onChange={(e)=>{
                  let searchVal = e.target.value;
                  console.log('search value:',searchVal);
                  let rows=[...this.state.searchTemp];
                  if (searchVal==="") {                   
                    this.setState({rowsData: rows});
                  }

                  let findRows= rows.filter((row)=>{return (row.toString().includes(searchVal))});
                  console.log('find rows',findRows);                           
                  this.setState({rowsData: [...findRows]});
                }}
            />
          </p>
        )
    }

   

    vlidateTable_DataStructure(){/*        remind me later ok?           */}

    render = () => {        
        return(
            <React.Fragment>
                <div 
                className={ this.state.bootstrapStyle.responsive ? BS_TABLE_RESPONSIVE[0] : ""}
                dir={this.state.tableDirectionRTL ? "rtl" : "ltr"}>
                {this.state.searchTemp.length<=0 && this.emptyTableEl()} 
                {this.state.searchView && this.applySearchElem()}   

                    <table className={"table"+
                    (this.state.bootstrapStyle.zebraRows ? " "+BS_TABLE_STRIPED : "" ) +
                    (this.state.bootstrapStyle.bordered ? " "+BS_TABLE_BORDERED : "" ) +
                    (this.state.bootstrapStyle.hoverable ? " "+BS_TABLE_HOVERABLE : "") +
                    (this.state.bootstrapStyle.smaller ? " "+BS_TABLE_SMALLER : "") +
                    (this.state.bootstrapStyle.tableColorSet ? " "+BS_TABLE_COLORSET[this.state.bootstrapStyle.tableColorSet] : "")
                    } 
                    >
                    {this.state.bootstrapStyle.caption 
                    && <caption className={this.state.tableDirectionRTL ? "text-right" : "text-left"}>
                        {this.state.bootstrapStyle.captionString}
                      </caption>}                
                        <thead className={BS_THEAD_STYLE[this.state.bootstrapStyle.theadStyle]}>
                            <tr>{this.tableColNamesEl()}</tr>
                        </thead>
                        <tbody>
                            { this.tableRows(this.state.rowsData) }                  
                        </tbody>
                    </table>
                </div>
            </React.Fragment>
        );
    }
}