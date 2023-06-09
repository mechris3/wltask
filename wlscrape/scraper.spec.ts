import axios from 'axios';
import cheerio from 'cheerio';
import { scrapeWebsite } from './scraper';
import { error } from 'console';

jest.mock('axios');

describe('scraper', () => {
    const mockHtmlResponse = `
    <div class="sections_wrapper">
	<div class="widget block block-static-block">
		<section id="subscriptions" class="content_section grid">
			<div class="row" style="margin-left:0px; margin-right:0px">
				<div class="top-line-decoration"></div>
				<h2>Monthly Subscription Packages</h2>
				<div class="colored-line"></div>
				<div class="sub-heading">
					Choose from the packages below and get your product connected;
				</div>
				<div class="pricing-table">
					<div class="row-subscriptions" style="margin-bottom:40px;">
						<div class="col-xs-4">
							<div class="package featured-right" style="margin-top:0px; margin-right:0px; margin-bottom:0px; margin-left:25px">
								<div class="header dark-bg">
									<h3>Basic: 500MB Data - 12 Months</h3>
								</div>
								<div class="package-features">
									<ul>
										<li>
											<div class="package-name">The basic starter subscription providing you with all you need to get your device up and running with inclusive Data and SMS services.</div>
										</li>
										<li>
											<div class="package-description">Up to 500MB of data per month<br>including 20 SMS<br>(5p / MB data and 4p / SMS thereafter)</div>
										</li>
										<li>
											<div class="package-price"><span class="price-big">£5.99</span><br>(inc. VAT)<br>Per Month</div>
										</li>
										<li>
											<div class="package-data">12 Months - Data &amp; SMS Service Only</div>
										</li>
									</ul>
									<div class="bottom-row">
										<a class="btn btn-primary main-action-button" href="https://wltest.dns-systems.net/" role="button">Choose</a>
									</div>
								</div>
							</div>
						</div>
						<!-- /END PACKAGE -->
						<!-- PACKAGE TWO -->
						<div class="col-xs-4">
							<div class="package featured center" style="margin-left:0px;">
								<div class="header dark-bg">
									<h3>Standard: 1GB Data - 12 Months</h3>
								</div>
								<div class="package-features">
									<ul>
										<li>
											<div class="package-name">The standard subscription providing you with enough service time to support the average user to enable your device to be up and running with inclusive Data and SMS services.</div>
										</li>
										<li>
											<div class="package-description">Up to 1 GB data per month<br>including 35 SMS<br>(5p / MB data and 4p / SMS thereafter)</div>
										</li>
										<li>
											<div class="package-price"><span class="price-big">£9.99</span><br>(inc. VAT)<br>Per Month</div>
										</li>
										<li>
											<div class="package-data">12 Months - Data &amp; SMS Service Only</div>
										</li>
									</ul>
									<div class="bottom-row">
										<a class="btn btn-primary main-action-button" href="https://wltest.dns-systems.net/" role="button">Choose</a>
									</div>
								</div>
							</div>
						</div>
						<!-- /END PACKAGE -->
						<!-- PACKAGE THREE -->
						<div class="col-cs-4">
							<div class="package featured-right" style="margin-top:0px; margin-left:0px; margin-bottom:0px">
								<div class="header dark-bg">
									<h3>Optimum: 2 GB Data - 12 Months</h3>
								</div>
								<div class="package-features">
									<ul>
										<li>
											<div class="package-name">The optimum subscription providing you with enough service time to support the above-average user to enable your device to be up and running with inclusive Data and SMS services</div>
										</li>
										<li>
											<div class="package-description">2GB data per month<br>including 40 SMS<br>(5p / minute and 4p / SMS thereafter)</div>
										</li>
										<li>
											<div class="package-price"><span class="price-big">£15.99</span><br>(inc. VAT)<br>Per Month</div>
										</li>
										<li>
											<div class="package-data">12 Months - Data &amp; SMS Service Only</div>
										</li>
									</ul>
									<div class="bottom-row">
										<a class="btn btn-primary main-action-button" href="https://wltest.dns-systems.net/#" role="button">Choose</a>
									</div>
								</div>
							</div>
						</div>
						<!-- /END PACKAGE -->
					</div>
					<!-- /END ROW -->
				</div>
				<!-- /END ALL PACKAGE -->
			</div>
			<!-- /END CONTAINER -->
		</section>
	</div>
	<div class="widget block block-static-block">
		<section id="subscriptions" class="content_section grid">
			<div class="row" style="margin-left:0px; margin-right:0px">
				<div class="top-line-decoration"></div>
				<h2>Annual Subscription Packages</h2>
				<div class="colored-line"></div>
				<div class="sub-heading">
					Choose from the packages below and get your product connected, each with per second billing.
				</div>
				<div class="pricing-table">
					<div class="row-subscriptions" style="margin-bottom:40px;">
						<div class="col-xs-4">
							<div class="package featured-right" style="margin-top:0px; margin-right:0px; margin-bottom:0px; margin-left:25px">
								<div class="header dark-bg">
									<h3>Basic: 6GB Data - 1 Year</h3>
								</div>
								<div class="package-features">
									<ul>
										<li>
											<div class="package-name">The basic starter subscription providing you with all you need to get you up and running with Data and SMS services to allow access to your device.</div>
										</li>
										<li>
											<div class="package-description">Up to 6GB of data per year<br>including 240 SMS<br>(5p / MB data and 4p / SMS thereafter)</div>
										</li>
										<li>
											<div class="package-price">
												<span class="price-big">£66.00</span><br>(inc. VAT)<br>Per Year
												<p style="color: red">Save £5.86 on the monthly price</p>
											</div>
										</li>
										<li>
											<div class="package-data">Annual - Data &amp; SMS Service Only</div>
										</li>
									</ul>
									<div class="bottom-row">
										<a class="btn btn-primary main-action-button" href="https://wltest.dns-systems.net/#" role="button">Choose</a>
									</div>
								</div>
							</div>
						</div>
						<!-- /END PACKAGE -->
						<!-- PACKAGE TWO -->
						<div class="col-xs-4">
							<div class="package featured center" style="margin-left:0px;">
								<div class="header dark-bg">
									<h3>Standard: 12GB Data - 1 Year</h3>
								</div>
								<div class="package-features">
									<ul>
										<li>
											<div class="package-name">The standard subscription providing you with enough service time to support the average user with Data and SMS services to allow access to your device.</div>
										</li>
										<li>
											<div class="package-description">Up to 12GB of data per year<br> including 420 SMS<br>(5p / MB data and 4p / SMS thereafter)</div>
										</li>
										<li>
											<div class="package-price">
												<span class="price-big">£108.00</span><br>(inc. VAT)<br>Per Year
												<p style="color: red">Save £11.90 on the monthly price</p>
											</div>
										</li>
										<li>
											<div class="package-data">Annual - Data &amp; SMS Service Only</div>
										</li>
									</ul>
									<div class="bottom-row">
										<a class="btn btn-primary main-action-button" href="https://wltest.dns-systems.net/#" role="button">Choose</a>
									</div>
								</div>
							</div>
						</div>
						<!-- /END PACKAGE -->
						<!-- PACKAGE THREE -->
						<div class="col-cs-4">
							<div class="package featured-right" style="margin-top:0px; margin-left:0px; margin-bottom:0px">
								<div class="header dark-bg">
									<h3>Optimum: 24GB Data - 1 Year</h3>
								</div>
								<div class="package-features">
									<ul>
										<li>
											<div class="package-name">The optimum subscription providing you with enough service time to support the above-average with data and SMS services to allow access to your device.</div>
										</li>
										<li>
											<div class="package-description">Up to 12GB of data per year<br> including 480 SMS<br>(5p / MB data and 4p / SMS thereafter)</div>
										</li>
										<li>
											<div class="package-price">
												<span class="price-big">£174.00</span><br>(inc. VAT)<br>Per Year
												<p style="color: red">Save £17.90 on the monthly price</p>
											</div>
										</li>
										<li>
											<div class="package-data">Annual - Data &amp; SMS Service Only</div>
										</li>
									</ul>
									<div class="bottom-row">
										<a class="btn btn-primary main-action-button" href="https://wltest.dns-systems.net/#" role="button">Choose</a>
									</div>
								</div>
							</div>
						</div>
						<!-- /END PACKAGE -->
					</div>
					<!-- /END ROW -->
				</div>
				<!-- /END ALL PACKAGE -->
			</div>
			<!-- /END CONTAINER -->
		</section>
	</div>
	<div class="widget block block-static-block">
		<section id="industry-awards" class="content_section grid">
			<div class="container">
				<div class="row">
					<div class="top-line-decoration"></div>
					<h2>What Our Customers Say</h2>
				</div>
				<div class="content row">
					<div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
						<div class="award-wrapper"><span class="client_img"><img src="./Demo-Home-Page-English_files/img5634566166a156.35493439.jpg" width="80" height="80"> </span> <span class="client_desc">"This technology has brought many benefits to our customers."</span></div>
					</div>
					<div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
						<div class="award-wrapper"><span class="client_img"><img src="./Demo-Home-Page-English_files/JE_New_Logo.png" width="80" height="80"> </span> <span class="client_desc">"...we can guarantee that the order will be received and fulfilled much more quickly than before."</span></div>
					</div>
					<div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
						<div class="award-wrapper"><span class="client_img"> <img src="./Demo-Home-Page-English_files/verifone_logo_detail.png" width="100" height="100"></span> <span class="client_desc">"We are pleased with the SIM provisioning system where we can control the provisioning of SIMs at point of installation."</span></div>
					</div>
				</div>
				<div class="content row">
					<div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
						<div class="award-wrapper"><span class="client_img"><img src="./Demo-Home-Page-English_files/siemens-square-01.png" width="80" height="80"> </span> <span class="client_desc">"The response to our connectivity proposition has been nothing but positive..."</span></div>
					</div>
					<div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
						<div class="award-wrapper"><span class="client_img"><img src="./Demo-Home-Page-English_files/uJp-gybB_400x400.png" width="80" height="80"> </span> <span class="client_desc">"This partnership is giving Invivodata [and ERT] a uniquely competitive edge."</span></div>
					</div>
					<div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
						<div class="award-wrapper"><span class="client_img"> <img src="./Demo-Home-Page-English_files/switchee_logo.png" width="100" height="100"></span> <span class="client_desc">"....a ‘one SIM fits all’ that reduces our commissioning time and provides stability in our connectivity."</span></div>
					</div>
				</div>
			</div>
		</section>
	</div>
	<div class="widget block block-static-block">
		<section id="support" class="content_section grid">
			<div class="row">
				<div class="top-line-decoration"></div>
				<h2>Advanced Technology - Simple Solutions</h2>
				<div class="colored-line"></div>
				<div class="container-fluid">
					<div class="row first-block">
						<div class="col-md-7">
							<div class="description">
								<p>Build your own activations portal and drive rewarding on-boarding programmes that can offer single step, payment-less activation through to a full subscription sign-up experience.</p>
								<p>Benefit from competitive tariffs and flexible payment options designed to work with Internet of Things devices and applications. For over 15 Years, acme logic has provided world class enterprises and technology companies with secure connectivity solutions. Our high service levels demonstrate our investment in commitment to your service and customer experience.</p>
								<p>&nbsp;</p>
							</div>
							<div class="bottom-row">
								<a class="btn btn-primary main-action-button" href="http://www.acme.com/#" role="button">Learn More</a>
							</div>
						</div>
						<div class="col-md-5">
							<div class="product-image">
								<img src="./Demo-Home-Page-English_files/Screen_Shot_Examples.jpeg" alt="">
							</div>
						</div>
					</div>
					<div class="row second-block">
						<div class="col-md-5">
							<div class="product-image">
								<img src="./Demo-Home-Page-English_files/Workflow_Screens.jpeg" alt="">
							</div>
						</div>
						<div class="col-md-7">
							<div class="description">
								<p>Offer specialist IoT subscription packages that include your own paid-for or complimentary services as part of a single transaction.</p>
								<p>Benefit from acme Logic's access to over 700 Mobile operators worldwide with high, medium and low bandwidth options from a single SIM.</p>
								<p>&nbsp;</p>
								<div class="col-md-4">
									<ul>
										<li>3G &amp; 4G</li>
										<li>Any Country</li>
										<li>Usage Controls</li>
									</ul>
								</div>
								<div class="col-md-4">
									<ul>
										<li>Pay-as-you-go</li>
										<li>Pay Monthly</li>
										<li>Pre-paid</li>
									</ul>
								</div>
								<div class="col-md-4">
									<ul>
										<li>Credit Card</li>
										<li>Direct Debits</li>
									</ul>
								</div>
							</div>
						</div>
						<div class="bottom-row">
							<a class="btn btn-primary main-action-button" href="http://www.acme-no-exist.com/#" role="button">Learn More</a>
						</div>
					</div>
					<!-- /END ROW -->
				</div>
			</div>
			<!-- /END CONTAINER -->
		</section>
	</div>
	<div class="widget block block-static-block">
		<section id="footer" class="content_section grid">
			<div class="row">
				<div class="top-line-decoration"></div>
				<h2>Information</h2>
				<div class="colored-line"></div>
				<div class="container-fluid">
					<div class="row">
						<div class="col-md-3">
							<div class="widget block block-static-block">
								<div class="footer-col">
									<h4>About us</h4>
									<div class="footer-col-content footer-about">
										We are one of the leading providers of M2M and IoT connectivity in Europe. <br><br>As the largest independent service provider in the UK, we have network relationships with over 700 operators globally.<br>
									</div>
								</div>
							</div>
						</div>
						<div class="col-md-3">
							<div class="widget block block-static-block">
								<div class="footer-col">
									<h4>Who Are We?</h4>
									<div class="footer-col-content footer-contacts">
										<span>Acme by main development</span>
										<address>PO Box 4545, <br>Horizon, <br>Honey Land, <br>Jerusalem, <br>SL8 188H,<br>United Kingdom</address>
									</div>
								</div>
							</div>
						</div>
						<div class="col-md-3">
							<div class="widget block block-static-block">
								<div class="footer-col">
									<h4>Contact Us</h4>
									<div class="footer-col-content footer-contacts">
										<span class="foooter-contacts-tel"><a href="tel:+234234">0330 056 234234</a><br></span>
										<span class="foooter-contacts-email"><a href="mailto:test@acme.com">test@acme.com</a></span>
									</div>
									<h4>Further Information</h4>
									<a href="https://wltest.dns-systems.net/terms">Terms &amp; Conditions</a><br>
									<a href="https://wltest.dns-systems.net/privacy">How we handle your information</a>
								</div>
							</div>
						</div>
						<div class="col-md-3">
							<div class="widget block block-static-block">
								<div class="footer-col">
									<h4>Further Information</h4>
									<div class="footer-col-content footer-about">
										<a href="https://www.google.co.uk/search?q=acme+review&amp;oq=acme+review&amp;aqs=chrome..69i57j0l3j69i64l2.7367j1j4&amp;sourceid=chrome&amp;ie=UTF-8#lrd=0x487689dfa52ebfe3:0xbfd78fec651e8398,1,,,."><img src="./Demo-Home-Page-English_files/Reviews.jpeg" alt=""><br>Reviews<br>See what our customers say</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<!-- /END CONTAINER -->
				<br><br>
			</div>
		</section>
	</div>
</div>
    
  `;

    beforeEach(() => {
        jest.spyOn(axios, 'get').mockResolvedValue({ data: mockHtmlResponse });
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should scrape the website and return product options', async () => {
        const products = await scrapeWebsite().then(products => {

            expect(products).toEqual(
                [
                    {
                        description: 'Up to 12GB of data per year including 480 SMS(5p / MB data and 4p / SMS thereafter)',
                        discount: 'Save £17.90 on the monthly price',
                        price: '£174.00',
                        title: 'Optimum: 24GB Data - 1 Year',
                    },
                    {
                        description: 'Up to 12GB of data per year including 420 SMS(5p / MB data and 4p / SMS thereafter)',
                        discount: 'Save £11.90 on the monthly price',
                        price: '£108.00',
                        title: 'Standard: 12GB Data - 1 Year',
                    },
                    {
                        description: 'Up to 6GB of data per yearincluding 240 SMS(5p / MB data and 4p / SMS thereafter)',
                        discount: 'Save £5.86 on the monthly price',
                        price: '£66.00',
                        title: 'Basic: 6GB Data - 1 Year',
                    },
                    {
                        description: '2GB data per monthincluding 40 SMS(5p / minute and 4p / SMS thereafter)',
                        discount: '',
                        price: '£15.99',
                        title: 'Optimum: 2 GB Data - 12 Months',
                    },
                    {
                        description: 'Up to 1 GB data per monthincluding 35 SMS(5p / MB data and 4p / SMS thereafter)',
                        discount: '',
                        price: '£9.99',
                        title: 'Standard: 1GB Data - 12 Months',
                    },
                    {
                        description: 'Up to 500MB of data per monthincluding 20 SMS(5p / MB data and 4p / SMS thereafter)',
                        discount: '',
                        price: '£5.99',
                        title: 'Basic: 500MB Data - 12 Months',
                    }
                ]
            );
        });





    });


    it('should handle HTTP request errors', async () => {
        jest.spyOn(axios, 'get').mockRejectedValue(new Error());
        try {
            await scrapeWebsite();
        } catch (error) {
            expect(error).toEqual('Connection Error');
        }
    });


    it('should handle missing elements in HTML', async () => {
        const mockHtmlResponseMissingElement = `
        <div class="pricing-table">
        <div class="row-subscriptions" style="margin-bottom:40px;">
            <div class="col-xs-4">
                <div class="package featured-right" style="margin-top:0px; margin-right:0px; margin-bottom:0px; margin-left:25px">
                    <div class="header dark-bg">
                        <h3>Basic: 500MB Data - 12 Months</h3>
                    </div>
                    <div class="package-features">
                        <ul>
                            <li>
                                <div class="package-name">The basic starter subscription providing you with all you need to get your device up and running with inclusive Data and SMS services.</div>
                            </li>
                            <li>
                                <div class="package-description">Up to 500MB of data per month<br>including 20 SMS<br>(5p / MB data and 4p / SMS thereafter)</div>
                            </li>
                            
                            <li>
                                <div class="package-data">12 Months - Data &amp; SMS Service Only</div>
                            </li>
                        </ul>
                        <div class="bottom-row">
                            <a class="btn btn-primary main-action-button" href="https://wltest.dns-systems.net/" role="button">Choose</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    `;

        jest.spyOn(axios, 'get').mockResolvedValue({ data: mockHtmlResponseMissingElement });

        const products = await scrapeWebsite();

        expect(products).toHaveLength(1);

        expect(products[0]).toEqual({
            title: 'Basic: 500MB Data - 12 Months',
            description: 'Up to 500MB of data per monthincluding 20 SMS(5p / MB data and 4p / SMS thereafter)',
            price: '',
            discount: '',
        });
    });
});
