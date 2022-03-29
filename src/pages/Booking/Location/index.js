import React, {useEffect, useState} from 'react';
import GoogleMap from 'google-map-react';
import './style.scss';
import {FaMapMarker, FaMapMarkerAlt} from "react-icons/all";
import PlacesAutocomplete, {
	geocodeByAddress,
	getLatLng,
} from 'react-places-autocomplete';
import {Input, Space, Typography} from "antd";
import {Pagination} from "../../index";
import {useDispatch, useSelector} from "react-redux";
import {addToCart, setLocation, setLocationDetails} from "../../../redux/actions/cart";


const Marker = () => <div><FaMapMarkerAlt style={{fontSize: '40px', transform: 'translate(-50%, -100%)'}}/></div>;

const Location = () => {
	const dispatch = useDispatch();
	const cart = useSelector(({cart}) => cart.items[cart.currentApp])
	const [google, setGoogle] = useState({map: null, maps: null, loaded: false});

	const handleChange = (address, dir) => {
		dispatch(setLocation(dir, address))
	};
	const handleSelect = async (address, dir) => {
		dispatch(setLocation(dir, address))
		const result = await geocodeByAddress(address)
		await getLatLng(result[0]).then(res => dispatch(setLocationDetails('coordinates', res, dir)))
	};

	useEffect(() => {
		if (cart?.from?.coordinates && cart?.to?.coordinates && google.loaded) {
			const service = new google.maps.DistanceMatrixService();
			const request = {
				origins: [cart.from.coordinates],
				destinations: [cart.to.coordinates],
				travelMode: google.maps.TravelMode.DRIVING,
				unitSystem: google.maps.UnitSystem.IMPERIAL,
				avoidHighways: false,
				avoidTolls: false,
			};
			service.getDistanceMatrix(request).then((response) => {
				const distance = (Number(response.rows[0].elements[0].distance.value) / 1609.34).toFixed(1)
				dispatch(addToCart('distance', distance))
			})
		}
	}, [cart?.from?.coordinates, cart?.to?.coordinates, google, dispatch])

	const inputs = (array) => array.map(input => (
		<PlacesAutocomplete
			key={input}
			value={cart[input]?.address}
			onChange={(address) => handleChange(address, input)}
			onSelect={(address) => handleSelect(address, input)}
			googleCallbackName="__googleMapsCallback"
		>
			{({getInputProps, suggestions, getSuggestionItemProps, loading}) => (
				<div>
					<Input
						{...getInputProps({
							placeholder: `${input}...`,
							className: 'location-search-input',
						})}
						size={"large"}
						prefix={<FaMapMarker/>}
						style={{width:'100%'}}
						name={input}
					/>
					<div className="autocomplete-dropdown-container">
						{loading && <div>Loading...</div>}
						{suggestions.map(suggestion => {
							const className = suggestion.active
								? 'suggestion-item--active'
								: 'suggestion-item';
							const style = suggestion.active
								? {backgroundColor: '#fafafa', cursor: 'pointer'}
								: {backgroundColor: '#ffffff', cursor: 'pointer'};
							return (
								<div
									{...getSuggestionItemProps(suggestion, {
										className,
										style,
									})}
									key={suggestion.description}
								>
									<span>{suggestion.description}</span>
								</div>
							);
						})}
					</div>
				</div>
			)}
		</PlacesAutocomplete>
	))

	return (
		<div>
			<Space style={{width:'100%'}} direction="vertical" size="large" wrap>
				<Typography.Title style={{textAlign: 'center'}}>Add Location</Typography.Title>
				<div style={{height: '300px', width: '100%'}}>
					<GoogleMap
						bootstrapURLKeys={{
							key: 'AIzaSyAlsNqKF2WOELGttZAv5UcXZOQkKrQEf6M',
							libraries: ['places'],
							language: 'en',
							region: 'us',
						}}
						defaultCenter={{lat: 32.74, lng: -117.13}}
						defaultZoom={11}
						yesIWantToUseGoogleMapApiInternals
						onGoogleApiLoaded={({map, maps}) => setGoogle({map, maps, loaded: true})}
					>
						{[cart?.from?.coordinates, cart?.to?.coordinates]
						.filter(el => typeof(el) !== "undefined" && el !== null )
						.map(el => (
							<Marker
								key={`${el.lat}${el.lng}`}
								lat={el.lat}
								lng={el.lng}
							/>
						))}
					</GoogleMap>
				</div>
				{google.loaded && inputs(['from', 'to'])
				}
				{cart?.distance ? `Distance: ${cart?.distance} mile` : null}
				<Pagination next="/location-details" progress="20" required={!cart.distance}/>
			</Space>
		</div>
);
};

export default Location;