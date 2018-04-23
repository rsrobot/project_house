import React from "react";
import io from "socket.io-client";

class Chat extends React.Component
{
  constructor(props)
  {
    super(props);

    this.state = {
        income1: 0,
        income2: 0,
        credits: 0,
        car: 0,
        pay: 0,
        interest: 6,
        year: 30,
        showResults: false,
        permonth: 0,
        asset: 0,
        messages: []
    };

    this.socket = io('localhost:8080');

    this.socket.on('RECEIVE_MESSAGE', function(data){
        addMessage(data);
    });

    const addMessage = data => {
        console.log(data);
        this.setState({messages: [...this.state.messages, data]});
        console.log(this.state.messages);
        console.log("ADD");
    };

    this.sendMessage = () => {

        this.setState({ permonth: 0});

        this.setState({ permonth: (0.65 * (parseInt(this.state.income1, 10) + parseInt(this.state.income2, 10) - parseInt(this.state.credits, 10) - parseInt(this.state.car, 10) - parseInt(this.state.pay, 10)))});
        
        var tmp = 0;
        var tmp_int = this.state.interest / 100 / 12;
        tmp = Math.round(((0.65 * (parseInt(this.state.income1, 10) + parseInt(this.state.income2, 10) - parseInt(this.state.credits, 10) - parseInt(this.state.car, 10) - parseInt(this.state.pay, 10))) * (1 - Math.pow((1 + tmp_int), -(this.state.year * 12)))) / tmp_int, 0);
        this.setState({ asset: tmp});
        this.setState({ showResults: true });
    }


  }

    render(){
        return (

            <div className="container">
                <h2>คำนวณความสามารถในการกู้</h2>
                <hr/>
                <div className="row">
                    <div className="col-md-12">
                          <div className="card">
                              <div className="card-body">
                                  <div className="card-title">รายได้เฉลี่ย/เดือน </div>
                                  <div className="messages">

                                  </div>
                                  <div className="footer">
                                      
                                      <table className="table">
                                        <tbody>
                                          <tr>
                                            <td className="table-width">รายได้ผู้กู้คนที่ 1 *</td>
                                                <td><input type="text" placeholder="" value={this.state.income1} onChange={ev => this.setState({income1: ev.target.value})} className="form-control"/></td>
                                            <td>บาท</td>
                                          </tr>
                                          <tr>
                                            <td>รายได้ผู้กู้คนที่ 2</td>
                                                <td><input type="text" placeholder="" className="form-control" value={this.state.income2} onChange={ev => this.setState({income2: ev.target.value})}/></td>
                                            <td>บาท</td>
                                          </tr>
                                        </tbody>
                                      </table>

                                      
                                  </div>
                              </div>
                          </div>
                      </div>


                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="card-title">ค่าใช้จ่ายเฉลี่ยต่อเดือน </div>
                                <div className="messages">
  
                                </div>
                                <div className="footer">
                                    <table className="table">
                                        <tbody>
                                            <tr>
                                                <td className="table-width">ยอดขั้นต่ำของบัตรเครดิตทุกใบรวมกัน/เดือน</td>
                                                <td><input type="text" placeholder="" value={this.state.credits} onChange={ev => this.setState({ credits: ev.target.value })} className="form-control" /></td>
                                                <td>บาท</td>
                                            </tr>
                                            <tr>
                                                <td>ค่างวดรถ/เดือน</td>
                                                <td><input type="text" placeholder="" className="form-control" value={this.state.car} onChange={ev => this.setState({ car: ev.target.value })} /></td>
                                                <td>บาท</td>
                                            </tr>
                                            <tr>
                                                <td>ค่าใช้จ่าย/เดือน</td>
                                                <td><input type="text" placeholder="" className="form-control" value={this.state.pay} onChange={ev => this.setState({ pay: ev.target.value })} /></td>
                                                <td>บาท</td>
                                            </tr>
                                        </tbody>
                                    </table>


                                </div>
                            </div>
                        </div>
                    </div>


                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="card-title">รายละเอียดการขอสินเชื่อ </div>
                                <div className="messages">
          
                                </div>
                                <div className="footer">
                                    <table className="table">
                                        <tbody>
                                            <tr>
                                                <td className="table-width">ดอกเบี้ยที่ใช้ในการคำนวณ *</td>
                                                <td><input type="text" placeholder="" value={this.state.interest} onChange={ev => this.setState({ interest: ev.target.value })} className="form-control" /></td>
                                                <td>%</td>
                                            </tr>
                                            <tr>
                                                <td> ระยะเวลาที่ขอกู้ * </td>
                                                <td><input type="text" placeholder="" className="form-control" value={this.state.year} onChange={ev => this.setState({ year: ev.target.value })} /></td>
                                                <td>ปี</td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td><button onClick={this.sendMessage} className="btn btn-primary form-control">คำนวณ</button></td>
                                            </tr>
                                        </tbody>
                                    </table>


                                </div>
                            </div>
                        </div>
                    </div>


                </div>
                <div>
                    {this.state.showResults
                        ? <div className="row">
                            <div className="col-md-12">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="card-title">ผลการคำนวณ</div>
                                        <div className="messages">

                                        </div>
                                        <div className="footer">

                                            <table className="table">
                                                <tbody>
                                                    <tr>
                                                        <td className="table-width">กู้ได้</td>
                                                        <td>{this.state.asset}</td>
                                                        <td>บาท</td>
                                                    </tr>
                                                    <tr>
                                                        <td>ค่างวดต่อเดือน</td>
                                                        <td>{this.state.permonth}</td>
                                                        <td>บาท</td>
                                                    </tr>
                                                </tbody>
                                            </table>


                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>
                        : null
                    }
                </div>
            </div>
        );
    }
    
}


export default Chat;