import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

import swal from 'sweetalert';

class Addrestaurant extends Component
{
    state = {
        name: '',
        address: '',
        file: '',
        file_path: '',
        image: '',
        phone: '',
        image: '',
        error_list: [],
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    
    saveRestaurant = async (e) => {
        e.preventDefault();
        const data = new FormData() 
        data.append('file', this.state.file)
        const res = await axios.post('http://localhost:8000/api/add-restaurant', this.state);
        if(res.data.status === 200)
        {
           //console.log(res.data.message);
           swal({
            title: "Success!",
            text: res.data.message,
            icon: "success",
            button: "OK!",
          });
          this.props.history.push('/');
           this.setState({
            name: '',
            address: '',
            email: '',
            phone: '',
           });
        }
        else
        {
            this.setState({
               error_list: res.data.validate_err,
            });
        }
    }   

     render(){
         return(
           <div className="container">
               <div className="row">
                   <div className="col-md-6">
                       <div className="card">
                           <div className="card-header">
                               <h4>Add Restaurants
                                   <Link to={'/'} className="btn btn-primary btn-sm float-end"> BACK</Link>
                               </h4>
                           </div>
                           <div className="card-body">
                            
                                <form  onSubmit={this.saveRestaurant} >

                                    <div className="form-group-mb-3">
                                        <label>Restaurant Name </label>
                                        <input type="text" name="name" onChange={this.handleInput} value={this.state.name} className="form-control" />
                                        <span className="text-danger">{this.state.error_list.name}</span>
                                    </div>
                                    <div className="form-group-mb-3">
                                        <label>Restaurant Address </label>
                                        <input type="text" name="address" onChange={this.handleInput} value={this.state.address} className="form-control" />
                                        <span className="text-danger">{this.state.error_list.address}</span>
                                    </div>
                                    <div className="form-group-mb-3">
                                        <label>Restaurant Email </label>
                                        <input type="text" name="email" onChange={this.handleInput} value={this.state.email} className="form-control" />
                                        <span className="text-danger">{this.state.error_list.email}</span>
                                    </div>
                                    <div className="form-group-mb-3">
                                        <label>Restaurant Phone </label>
                                        <input type="text" name="phone" onChange={this.handleInput} value={this.state.phone} className="form-control" />
                                        <span className="text-danger">{this.state.error_list.phone}</span>
                                    </div>
                                    <div className="form-group-mb-3">
                                        <label >Restaurant Image</label>
                                         <input type="file" name="file_path"  className="form-control" />
                                    </div>
                                    <div className="form-group mb-3">
                                    <input type="submit" value="insert"
                                            class="btn btn-primary mt-5"/>
                                    </div>
                                </form>
                           </div>
                       </div>
                   </div>
               </div>
           </div>
         );
     }

}

export default Addrestaurant;
