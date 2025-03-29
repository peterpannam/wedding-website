const Footer = () => {
    return (
      <footer className="bg-black text-white py-6 background-dark ">
        <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
                <div className="mb-4">
                    <h3 className="text-2xl font-lora">Contact Us</h3>
                    <p className="text-lg font-montserrat">Email: <a href="mailto:sophieboxkobo@gmail.com?subject=Wedding&cc=peter.pannam1@gmail.com">sophieboxkobo@gmail.com</a></p>
                    <p className="text-lg font-montserrat">Email: <a href="mailto:sophieboxkobo@gmail.com?subject=Wedding&cc=sophieboxkobo@gmail.com">peter.pannam1@gmail.com</a></p>
                </div>
            </div>
            <div className="flex flex-col justify-center items-center ">
                    <div className="text-sm font-lora opacity-70">
                        &copy; {new Date().getFullYear()} Pete and Soph WebDevelopment
                    </div>
            </div>

        </div>
      </footer>
    );
};
  
  export default Footer;
  