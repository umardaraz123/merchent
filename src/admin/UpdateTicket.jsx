import React, { useState,useEffect,useRef } from "react";
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { MdOutlinePriceCheck } from "react-icons/md";
import { TbUpload } from "react-icons/tb";
import { RxCross2 } from "react-icons/rx";
import { useNavigate,useParams } from "react-router-dom";
import { TicketsApi } from '../services/Tickets'
import { GoogleMap, LoadScript, Autocomplete } from "@react-google-maps/api";
// import Image from "next/image";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateTicket = () => {
  const Map_API = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  const navigate = useNavigate()
  const {tcid} = useParams()
 
  const[loading,setLoading]=useState(false)
  const [title, setTitle] = useState("");
  const [ticketDetail,setTicketDetail]=useState({})
  const [location, setLocation] = useState("");
  const[latitude,setLatitude]=useState('')
    const[longitude,setLongitude]=useState('')
    const [selectedPlace, setSelectedPlace] = useState(null);
    const autoCompleteRef = useRef(null);
   const [category,setCategory] = useState('')
  const [isTrending, setIsTrending] = useState("");
  const [isNewlyAdded, setIsNewlyAdded] = useState("");
  const [isHotOffer, setIsHotOffer] = useState("");
  const [type, setType] = useState("tickets");
  const [expiryDate, setExpiryDate] = useState("");
  const [description, setDescription] = useState("");
  const [instructions, setInstructions] = useState("");
  const [prices, setPrices] = useState([
    {id: '', title: "", price: "", discounted_price: "" },
  ]);
   const [images, setImages] = useState([]);
   // handle place change latitude aur longitude
   const handlePlaceChanged = () => {
    const place = autoCompleteRef.current.getPlace();
    if (place && place.geometry) {
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      const address = place.formatted_address;
      setLocation(place.formatted_address)
      setLatitude(place.geometry.location.lat())
      setLongitude(place.geometry.location.lng())
      console.log("Latitude:", lat);
      console.log("Longitude:", lng);
      console.log("Address:", address);

      setSelectedPlace({
        lat,
        lng,
        address,
      });
    }
  };
   
     // Function to handle image upload
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    // Store the file URLs in the state to display images
    const newImages = files.map((file) => ({
      id: URL.createObjectURL(file),
      file,
    }));
    setImages([...images, ...newImages]);
  };

  // Function to remove an image
  const removeImage = (id) => {
    const filteredImages = images.filter((image) => image.id !== id);
    setImages(filteredImages);
  };

  const handleDescription = (content, delta, source, editor) => {
    setDescription(content);
  };
  const handleInstructions = (content, delta, source, editor) => {
    setInstructions(content);
  };
  // Function to handle input changes for each row
  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    const newPrices = [...prices];
    newPrices[index][name] = value;
    setPrices(newPrices);
  };
  // Function to add a new row of input fields
  const addNewPrice = () => {
    setPrices([...prices, { title: "", price: "", discounted_price: "" }]);
  };
    // Function to remove a new row of input fields
  const removePrice= (index) => {
    // Only remove if there's more than one row
    if (prices?.length > 1) {
      const newPrices = prices?.filter((_, i) => i !== index);
      setPrices(newPrices);
    }
  };

  async function getTicketDetailApi() {
    setLoading(true);
  
    try {
        const result = await TicketsApi.getTicketDetailPublic(tcid)
        if(result.status == 200) {
          setLoading(false); 
          setTicketDetail(result?.data?.data)
          setTitle(result?.data?.data?.title)
          setLocation(result?.data?.data?.location)
          setLatitude(result?.data?.data?.latitude)
          setLongitude(result?.data?.data?.longitude)
          setType(result?.data?.data?.type)
          setIsTrending(result?.data?.data?.is_trending)
          setIsNewlyAdded(result?.data?.data?.is_newly_added)
          setIsHotOffer(result?.data?.data?.is_hot_offer)
          setIsNewlyAdded(result?.data?.data?.is_newly_added)
          setExpiryDate(result?.data?.data?.expiry_date)
          setDescription(result?.data?.data?.description)
          setInstructions(result?.data?.data?.special_instructions)
          setCategory(result?.data?.data?.category)
          const extractedPrices = result?.data?.data?.prices?.map(price => ({
            id:price.id,
            title: price.title,
            price: price.price,
            discounted_price: price.discounted_price
          })) || [{id:'', title: "", price: "", discounted_price: "" }];
        
          setPrices(extractedPrices);
          toast.success("Record fetched successfuly",{
            autoClose:1000,
            pauseOnHover:true,
            draggable:true,
            
          });
           
          
         }
        
        
        
    } catch (error) {
        console.log(error)
    }
     
  } 

  useEffect(()=>{
    getTicketDetailApi()
  },[])
  //update ticket function 
  async function updateTicketFunction() {
  
    const formData = new FormData();
   
    if(title){
        formData.append('title', title);
    }
   
    if(location){
        formData.append('location', location);
    }
    if(latitude){
      formData.append('latitude', latitude);
  }
  
  if(longitude){
    formData.append('longitude', longitude);
}
    if(category){
      formData.append('category', category);
  }

    if(type){
      formData.append('type', type);
  }
  if(isTrending){
    formData.append('is_trending', isTrending);
}
if(isNewlyAdded){
  formData.append('is_newly_added', isNewlyAdded);
}
if(isHotOffer){
  formData.append('is_hot_offer', isHotOffer);
}
if(expiryDate){
  formData.append('expiry_date', expiryDate);
}
    if(description){
      formData.append('description', description);
  }
  if(instructions){
    formData.append('special_instructions', instructions);
}
if(prices){
  formData.append('prices', JSON.stringify(prices))
}
   
if(images){
  images.forEach((image, index) => {
    formData.append(`images[${index}]`, image.file);
  });
}
setLoading(true);
    try {
        const result = await TicketsApi.updateTicketApi(tcid,formData)
        console.log("ll",result)
        if(result.status == 200) {
          setLoading(false); 
          toast.success("Record updatedd successfuly",{
            autoClose:1000,
            pauseOnHover:true,
            draggable:true,
            
          });
           
          navigate('/admin/tickets')
         }
        else {
          toast.error(result?.data?.message,{
            autoClose:1000,
            pauseOnHover:true,
            draggable:true,
            
          });
          setLoading(false)
        }
        
        
    } catch (error) {
        console.log(error)
        setLoading(false)
    }
     
  } 
  return (
    <div className="create-ticket-wrapper">
       <ToastContainer />
        {loading && <div className='main-loader'>
            <div className="spinner"></div>
            </div>}
      <h2 className="title">Please fill out details for ticket</h2>
      <div className="row">
        <div className="col-12 col-md-6 mb-4">
          <div className="input-wrapper">
            <label htmlFor="">Ticket Title </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input"
            />
          </div>
        </div>
        <div className="col-12 col-md-6 mb-4">
          <div className="input-wrapper">
            <label htmlFor="">Ticket Location</label>
                  
                      <LoadScript googleMapsApiKey={Map_API} libraries={["places"]}>
                  <div className="input-wrapper">
                    <Autocomplete
                      onLoad={(ref) => (autoCompleteRef.current = ref)}
                      onPlaceChanged={handlePlaceChanged}
                    >
                      <input
                        type="text"
                        className="input"
                        placeholder={location? location : "Search for location"}
                   
                       
                      />
                    </Autocomplete>
                  </div>
            
                
            
                 
                </LoadScript>
          </div>
        </div>
        <div className="col-12 col-md-6 mb-4">
          <div className="input-wrapper">
            <label htmlFor="">Category</label>
            <select value={category} onChange={(e)=>setCategory(e.target.value)} className="input">
              <option value="activities-and-events">Activities & Events</option>
              <option value="baeauty-and-wellness">Beauty & Wellness</option>
              <option value="family">Family</option>
              <option value="restaurants">Restaurants</option>
              <option value="groceries">Groceries</option>
              <option value="home-and-autos">Home & Autos</option>
              <option value="shopping">Shopping</option>
              <option value="niagara">Niagara</option>
              <option value="travel">Travel</option>
              <option value="things-to-do">Things To Do</option>
              <option value="popular">Popular</option>
              <option value="home-services">Home Services</option>
              
              
            </select>
          </div>
        </div>
        <div className="col-12 col-md-6 mb-4">
          <div className="input-wrapper">
            <label htmlFor="">Ticket Type</label>
            <select className="input" value={type} onChange={(e)=>setType(e.target.value)} >
              <option value="">Select one</option>
              <option value="tickets">Tickets</option>
              <option value="deals">Deals</option>
            </select>
            
          </div>
        </div>
        <div className="col-12 col-md-6 mb-4">
          <div className="input-wrapper">
            <label htmlFor="">Is Trending ?</label>
            <select className="input" value={isTrending} onChange={(e)=>setIsTrending(e.target.value)} >
              <option value="">Select one</option>
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>
            
          </div>
        </div>
        <div className="col-12 col-md-6 mb-4">
          <div className="input-wrapper">
            <label htmlFor="">Is Newly Added?</label>
            <select className="input" value={isNewlyAdded} onChange={(e)=>setIsNewlyAdded(e.target.value)} >
              <option value="">Select one</option>
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>
            
          </div>
        </div>
        <div className="col-12 col-md-6 mb-4">
          <div className="input-wrapper">
            <label htmlFor="">Is Hot offer?</label>
            <select className="input" value={isHotOffer} onChange={(e)=>setIsHotOffer(e.target.value)} >
              <option value="">Select one</option>
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>
            
          </div>
        </div>
        <div className="col-12 col-md-6 mb-4">
          <div className="input-wrapper">
            <label htmlFor="">Expiry Date</label>
            <input
              type="date"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              className="input"
            />
          </div>
        </div>
      </div>
      <h2 className="subtitle">
        Please add more prices if you have multiple packages
      </h2>

      {prices?.map((price, index) => (
        <div key={index} className="row relative-price">
            {prices?.length > 1 && (
            <button className="remove" onClick={() => removePrice(index)} >
             <RxCross2 />
            </button>
          )}
          <div className="col-12 col-md-6 mb-4">
            <div className="input-wrapper">
              <label htmlFor="">Price title</label>
              <input
                type="text"
                className="input"
                name="title"
                placeholder="Title"
                value={price.title}
                onChange={(e) => handleInputChange(index, e)}
              />
            </div>
          </div>
          <div className="col-12 col-md-3 mb-4">
            <div className="input-wrapper">
              <label htmlFor="">Price </label>
              <input
                type="number"
                name="price"
                className="input"
                placeholder="Price"
                value={price.price}
                onChange={(e) => handleInputChange(index, e)}
              />
            </div>
          </div>
          <div className="col-12 col-md-3 mb-4">
            <div className="input-wrapper">
              <label htmlFor="">Discounted Price </label>
              <input
            type="number"
            className="input"
            name="discounted_price"
            placeholder="Discounted Price"
            value={price.discounted_price}
            onChange={(e) => handleInputChange(index, e)}
          />
            </div>
          </div>
          
        </div>
      ))}

      <div className="add-price">
     <button className="button" onClick={addNewPrice}> <MdOutlinePriceCheck />  Add price</button>
      </div>
<h2 className="subtitle">
        Please add Ticket images (Select multiple if you want to add more than one image)
      </h2>
      <div className="file-uploader">
        <TbUpload />
      <input type="file" multiple onChange={handleImageUpload} />
      </div>
      <div className="images-uploaded">
          {images?.map((image) => (
            <div key={image.id} className="single-image" >
              <img alt="img"
                src={image.id}
                width="200" 
        height="200"
                
              />
              <button
                onClick={() => removeImage(image.id)}
                className="close"
              >
                <RxCross2 />
              </button>
            </div>))}

</div>
      <div className="row">
        <div className="col-12 mb-4">
          <div className="input-wrapper">
            <label htmlFor="">Ticket Description</label>
            <ReactQuill value={description} onChange={handleDescription} />
          </div>
        </div>
        <div className="col-12 mb-4">
          <div className="input-wrapper">
            <label htmlFor="">Please Type Special instructions here</label>
            <ReactQuill value={instructions} onChange={handleInstructions} />
          </div>
        </div>
      </div>
      <button className="create" onClick={updateTicketFunction}>
        update Ticket
      </button>
    </div>
  );
};

export default UpdateTicket;
