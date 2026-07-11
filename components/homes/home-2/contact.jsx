'use client'
import OutlineTitle from '@/components/common/outline-title'
import {site} from '@/data/site'

export default function Contact() {
	return (
		<div className='container'>
			<div className='row'>
				<div className='col-lg-5 mb-md-70'>
					<OutlineTitle text='Contact Me' />
					<p className='section-text mb-60 mb-md-40 mb-sm-30'>
						Have a question? Just drop me a line via email. I'm always open to
						hearing about interesting projects and ideas.
					</p>
					<div>
						<a
							href={`mailto:${site.email}`}
							className='link-hover-anim align-middle'
							data-link-animate='y'
						>
							{site.email}
						</a>
					</div>
				</div>
				<div className='col-lg-7 col-xl-6 offset-xl-1 pt-30 pt-md-0'>
					{/* Contact Form */}
					<form
						onSubmit={(e) => e.preventDefault()}
						className='form contact-form wow fadeInUp'
						id='contact_form'
					>
						{/* Name */}
						<div className='form-group d-block d-md-flex align-items-center'>
							<label htmlFor='name' className='mb-0 mb-sm-10 me-3'>
								Your Name
							</label>
							<div className='flex-grow-1'>
								<input
									type='text'
									name='name'
									id='name'
									className='input-sm form-control underline text-md-center'
									placeholder='Enter your name here'
									pattern='.{3,100}'
									required
									aria-required='true'
								/>
							</div>
						</div>
						{/* Email */}
						<div className='form-group d-block d-md-flex align-items-center'>
							<label htmlFor='email' className='mb-0 mb-sm-10 me-3'>
								Email Address
							</label>
							<div className='flex-grow-1'>
								<input
									type='email'
									name='email'
									id='email'
									className='input-sm form-control underline text-md-center'
									placeholder='Enter your email here'
									pattern='.{5,100}'
									required
									aria-required='true'
								/>
							</div>
						</div>
						{/* Message */}
						<div className='form-group'>
							<label htmlFor='message' className='mb-sm-10'>
								What’s your question?
							</label>
							<textarea
								name='message'
								id='message'
								className='input-sm form-control underline'
								style={{height: 120}}
								placeholder='Enter your message here'
								defaultValue={''}
							/>
						</div>
						<div className='row'>
							<div className='col-sm-5'>
								{/* Button */}
								<button
									className='submit_btn btn btn-mod btn-large btn-border btn-border-white btn-circle'
									data-btn-animate='y'
									id='submit_btn'
									aria-controls='result'
								>
									<span className='btn-animate-y'>
										<span className='btn-animate-y-1'>
											Send Message{' '}
											<i
												className='icon-arrow-right1 size-16'
												aria-hidden='true'
											/>
										</span>
										<span className='btn-animate-y-2' aria-hidden='true'>
											Send Message{' '}
											<i
												className='icon-arrow-right1 size-16'
												aria-hidden='true'
											/>
										</span>
									</span>
								</button>
							</div>
						</div>
						<div
							id='result'
							role='region'
							aria-live='polite'
							aria-atomic='true'
						/>
					</form>
					{/* End Contact Form */}
				</div>
			</div>
		</div>
	)
}
