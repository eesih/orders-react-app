import React from 'react';

const OrderDetails = ({ id,
    time,
    tilaaja,
    sposti,
    puh,
    lahettaja,
    puh2,
    nouto,
    vastaanottaja,
    puh3,
    vienti,
    lisatieto,
    lisatieto2,
    yhthenk,
    varattu,
    aloitettu,
    ajettu,
    kuljettaja_id,
    ajettu_pvm }) => (
        <div className="list-body-order">
            <div className="list-item">  
                <h3 className="orderlist-item__title">Id</h3>
                <h3>{id}</h3>
            </div>  
            <div className="list-item">  
                <h3 className="orderlist-item__title">Aika</h3>
                <h3>{time}</h3>
            </div>             
            <div className="list-item">  
                <h3 className="orderlist-item__title">Tilaaja</h3>
                <h3>{tilaaja}</h3>
            </div> 
            <div className="list-item">  
                <h3 className="orderlist-item__title">Email</h3>
                <h3>{sposti}</h3>
            </div> 
            <div className="list-item">  
                <h3 className="orderlist-item__title">Tilaajan puh</h3>
                <h3>{puh}</h3>
            </div>  
            <div className="list-item"> 
                <h3 className="orderlist-item__title">Lähettäjä</h3>
                <h3>{lahettaja}</h3>
            </div> 
            <div className="list-item"> 
                <h3 className="orderlist-item__title">Lähettäjän puh</h3>
                <h3>{puh2}</h3>
            </div>  
            <div className="list-item">  
                <h3 className="orderlist-item__title">Nouto</h3>
                <h3>{nouto}</h3>
            </div>  
            <div className="list-item"> 
                <h3 className="orderlist-item__title">Vastaanottaja</h3>
                <h3>{vastaanottaja}</h3>
            </div>              
            <div className="list-item">  
                <h3 className="orderlist-item__title">Puh 3</h3>
                <h3>{puh3}</h3>
            </div>   
            <div className="list-item">  
                <h3 className="orderlist-item__title">Vienti</h3>
                <h3>{vienti}</h3>
            </div>  
            <div className="list-item">  
                <h3 className="orderlist-item__title">Lisätietoa</h3>
                <h3>{lisatieto}</h3>
            </div>   
            <div className="list-item"> 
                <h3 className="orderlist-item__title">Lisätietoa</h3>
                <h3>{lisatieto2}</h3>
            </div>
            <div className="list-item">  
                <h3 className="orderlist-item__title">Yhteyshenkilö</h3>
                <h3>{yhthenk}</h3>
            </div>  
            <div className="list-item">  
                <h3 className="orderlist-item__title">Yhteyshenkilö</h3>
                <h3>{yhthenk}</h3>
            </div>                                                                                                                            
            <div className="list-item">  
                <h3 className="orderlist-item__title">Varattu</h3>
                <h3>{varattu}</h3>
            </div> 
            <div className="list-item"> 
                <h3 className="orderlist-item__title">Aloitettu</h3>
                <h3>{aloitettu}</h3>
            </div>   
            <div className="list-item">  
                <h3 className="orderlist-item__title">Ajettu</h3>
                <h3>{ajettu}</h3>
            </div> 
            <div className="list-item">  
                <h3 className="orderlist-item__title">Kuljettaja</h3>
                <h3>{kuljettaja_id}</h3>
            </div>   
            <div className="list-item">  
                <h3 className="orderlist-item__title">Ajettu pvm</h3>
                <h3>{ajettu_pvm}</h3>
            </div>                                                
        </div>
);

export default OrderDetails;