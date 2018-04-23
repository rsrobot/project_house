import React from "react";
import io from "socket.io-client";

class Chat extends React.Component
{
  constructor(props)
  {
    super(props);

    this.state = {
        username: '',
        message: '',
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
    };

    this.sendMessage = ev => {
        ev.preventDefault();
        this.socket.emit('SEND_MESSAGE', {
            author: this.state.username,
            message: this.state.message
        })
        this.setState({message: ''});
        console.log("AAAA");
    }
  }

    render(){
        return (

            <div class="container">
                <h2>คำนวณความสามารถในการกู้</h2>
                <hr/>
                <div class="row">
                    <div class="col-md-12">
                          <div class="card">
                              <div class="card-body">
                                  <div class="card-title">รายได้เฉลี่ย/เดือน </div>
                                  <div class="messages">
                                      {this.state.messages.map(message => {
                                          return (
                                              <div>{message.author}: {message.message}</div>
                                          )
                                      })}
                                  </div>
                                  <div class="footer">
                                      
                                      <table class="table">
                                        <tbody>
                                          <tr>
                                            <td class="table-width">รายได้ผู้กู้คนที่ 1 *</td>
                                            <td><input type="text" placeholder="" value={this.state.username} onChange={ev => this.setState({username: ev.target.value})} class="form-control"/></td>
                                            <td>บาท</td>
                                          </tr>
                                          <tr>
                                            <td>รายได้ผู้กู้คนที่ 2</td>
                                            <td><input type="text" placeholder="" class="form-control" value={this.state.message} onChange={ev => this.setState({message: ev.target.value})}/></td>
                                            <td>บาท</td>
                                          </tr>
                                        </tbody>
                                      </table>

                                      
                                  </div>
                              </div>
                          </div>
                      </div>


                </div>
                <div class="row">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-body">
                                <div class="card-title">ค่าใช้จ่ายเฉลี่ยต่อเดือน </div>
                                <div class="messages">
                                    {this.state.messages.map(message => {
                                        return (
                                            <div>{message.author}: {message.message}</div>
                                        )
                                    })}
                                </div>
                                <div class="footer">
                                    <table class="table">
                                        <tbody>
                                            <tr>
                                                <td class="table-width">ยอดขั้นต่ำของบัตรเครดิตทุกใบรวมกัน/เดือน</td>
                                                <td><input type="text" placeholder="" value={this.state.username} onChange={ev => this.setState({ username: ev.target.value })} class="form-control" /></td>
                                                <td>บาท</td>
                                            </tr>
                                            <tr>
                                                <td>ค่างวดรถ/เดือน</td>
                                                <td><input type="text" placeholder="" class="form-control" value={this.state.message} onChange={ev => this.setState({ message: ev.target.value })} /></td>
                                                <td>บาท</td>
                                            </tr>
                                            <tr>
                                                <td>ค่าใช้จ่าย/เดือน</td>
                                                <td><input type="text" placeholder="" class="form-control" value={this.state.message} onChange={ev => this.setState({ message: ev.target.value })} /></td>
                                                <td>บาท</td>
                                            </tr>
                                        </tbody>
                                    </table>


                                </div>
                            </div>
                        </div>
                    </div>


                </div>
                <div class="row">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-body">
                                <div class="card-title">รายละเอียดการขอสินเชื่อ </div>
                                <div class="messages">
                                    {this.state.messages.map(message => {
                                        return (
                                            <div>{message.author}: {message.message}</div>
                                        )
                                    })}
                                </div>
                                <div class="footer">
                                    <table class="table">
                                        <tbody>
                                            <tr>
                                                <td class="table-width">ดอกเบี้ยที่ใช้ในการคำนวณ *</td>
                                                <td><input type="text" placeholder="" value={this.state.username} onChange={ev => this.setState({ username: ev.target.value })} class="form-control" /></td>
                                                <td>%</td>
                                            </tr>
                                            <tr>
                                                <td> ระยะเวลาที่ขอกู้ * </td>
                                                <td><input type="text" placeholder="" class="form-control" value={this.state.message} onChange={ev => this.setState({ message: ev.target.value })} /></td>
                                                <td>ปี</td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td><button onClick={this.sendMessage} class="btn btn-primary form-control">คำนวณ</button></td>
                                            </tr>
                                        </tbody>
                                    </table>


                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        );
    }
}

export default Chat;