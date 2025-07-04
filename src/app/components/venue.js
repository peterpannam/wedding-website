import Image from 'next/image';

const Venue = () => {

    return (
        <div className="mt-8 max-w-4xl mx-auto">
            <h2 className="text-4xl font-lora text-center mb-8">The Venue</h2>
            
            {/* Ceremony */}
            <div className="mb-12 p-6 bg-white/80 backdrop-blur-sm rounded-lg shadow-lg mx-2 sm:mx-0">
                <h3 className="text-2xl font-lora text-blue-800 mb-4">Ceremony</h3>
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <h4 className="text-xl font-semibold text-gray-800 mb-2">St Mary&apos;s by the Sea</h4>
                        <p className="text-gray-600 mb-2">8 Dixie St, Port Douglas QLD 4877</p>
                        <p className="text-gray-600 mb-4">Saturday, 20th June at 4:00 PM</p>
                        
                        <div className="space-y-3">
                            <div>
                                <p className="text-gray-600"> Our ceremony will be held at St Mary’s by the Sea, a beautiful heritage-listed chapel located on the waterfront in Port Douglas. 
                                There is plenty of parking nearby and the venue is within walking distance of many local hotels. 
                                Please plan to arrive 15–20 minutes early to allow time to find a seat and settle in before the ceremony begins.<br/>
                                Join us after the ceremony for cold drinks on the lawn 
                                </p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <Image 
                            src="/St_Mary's_by_the_Sea.jpg" 
                            alt="St Mary's by the Sea venue" 
                            width={400}
                            height={300}
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </div>

            {/* Reception */}
            <div className="mb-12 p-6 bg-white/80 backdrop-blur-sm rounded-lg shadow-lg mx-2 sm:mx-0">
                <h3 className="text-2xl font-lora text-blue-800 mb-4">Reception</h3>
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <Image 
                            src="/hemmingways_port_douglas.jpg" 
                            alt="Hemmingway's reception venue" 
                            width={533}
                            height={300}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div>
                        <h4 className="text-xl font-semibold text-gray-800 mb-2">Hemingways Brewery Port Douglas</h4>
                        <p className="text-gray-600 mb-2">Crystalbrook Superyacht Marina, 44 Wharf St, Port Douglas QLD 4877</p>
                        
                        <div className="space-y-3">
                            <div>
                                
                                <p className="text-gray-600">Our reception will be held at Hemingway’s Brewery Port Douglas, a relaxed waterfront venue located at the Crystalbrook Superyacht Marina. With beautiful views over the marina and a laid-back tropical atmosphere, it’s the perfect place to celebrate with good food, great drinks, and even better company. The venue is just a short walk from the chapel and many local hotels, so you’ll be able to enjoy the evening without needing to travel far.</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* Getting There */}
            <div className="mb-12 p-6 bg-white/80 backdrop-blur-sm rounded-lg shadow-lg mx-2 sm:mx-0">
                <h3 className="text-2xl font-lora text-blue-800 mb-4">Getting There</h3>
                <p className="text-sm mb-4">Port Douglas is located in Tropical North Queensland, about an hour&apos;s scenic drive north of Cairns along the Captain Cook Highway.</p>

                <div className="grid mb-8 md:grid-cols-3 gap-6">
                    <div>
                        <h4 className="text-xl font-semibold text-gray-800 mb-2">From Cairns Airport</h4>
                        <p className="text-gray-600 text-sm mb-2">Most travellers arrive via Cairns Airport. From there, it’s approximately a 1-hour transfer by car, shuttle, or private transfer.</p>

                    </div>
                    <div>
                        <h4 className="text-xl font-semibold text-gray-800 mb-2">Shuttles & Transfers</h4>
                        <p className="text-gray-600 text-sm mb-2">Regular services run between Cairns and Port Douglas. Pre-booking is recommended during busy seasons.</p>

                    </div>
                    <div>
                        <h4 className="text-xl font-semibold text-gray-800 mb-2">Self-Drive</h4>
                        <p className="text-gray-600 text-sm mb-2">Enjoy a stunning coastal drive with views of the Coral Sea. There are plenty of scenic stops along the way.</p>

                    </div>
                </div>
                <div className=" w-full aspect-video rounded-lg overflow-hidden shadow-md">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3520.393964243276!2d145.4611973150616!3d-16.48421878861747!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x697ea6e2e2e2e2e3%3A0x504ef769cae62e0!2sPort%20Douglas%20QLD%204879%2C%20Australia!5e0!3m2!1sen!2sau!4v1680000000000!5m2!1sen!2sau"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Port Douglas Map"
                    ></iframe>
                </div>
            </div>
        </div>
    );
};

export default Venue;