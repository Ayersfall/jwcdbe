var s = {
	
	start: function() {
		s.ieDetect();
		s.resizeCols();
		s.setFont();
		s.textScaler();
	},
	
	ieDetect: function() {
		s.IEVersion = false;
		var rv = -1;
		if ( navigator.appName == 'Microsoft Internet Explorer' ) {
			var ua = navigator.userAgent;
			var re  = new RegExp( "MSIE ([0-9]{1,}[\.0-9]{0,})" );
			if ( re.exec( ua ) != null )
			s.IEVersion = parseFloat( RegExp.$1 );
		}
	},
	
	resizeCols: function() {
		if( s.IEVersion != 6 ) {
			var col_left = $( 'col_left' ).getStyle( 'height' ).toInt();
			var col_right = $( 'col_right' ).getStyle( 'height' ).toInt();
			if( col_left > col_right ) {
				$( 'col_right' ).setStyle( 'height', ( ( col_left + 40 ) / 10 ) + 'em' );
			}
			if( col_right > col_left )
				$( 'col_left' ).setStyle( 'height', ( col_right / 10 ) + 'em' );
		}
	},
	
	setFont: function() {
		if( Cookie.read( 'semfont' ) ) {
			var size = Cookie.read( 'semfont' );
			$( 'wrapper' ).setStyle( 'font-size', size + 'px' );
			s.fontSize = size.toFloat();
		}
		else
			s.fontSize = 10;
	},
	
	textScaler: function() {
		var begin = ( s.fontSize == 10 ) ? 0 : ( s.fontSize - 10 ) * 10;
		new Slider( $( 'scale_area' ), $( 'scale_knob' ), {
			steps: 100,
			onChange: function( pos ) {
				var size = ( ( pos.toInt() / 10 ) + 10 );
				$( 'wrapper' ).setStyle( 'font-size', size + 'px' );
			},
			onComplete: function( pos ) {
				var size = ( ( pos.toInt() / 10 ) + 10 );
				if( Cookie.read( 'semfont' ) )
					Cookie.dispose( 'semfont' );
				Cookie.write( 'semfont', size, { path: '/', duration: 28 } );
				s.fontSize = size;
			}
		} ).set( begin );
	}
}

window.addEvent( 'domready', s.start );

$(document).ready(function() {
    $('#contact_form').bootstrapValidator({
        // To use feedback icons, ensure that you use Bootstrap v3.1.0 or later
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            first_name: {
                validators: {
                        stringLength: {
                        min: 2,
                    },
                        notEmpty: {
                        message: 'Please supply your first name'
                    }
                }
            },
             last_name: {
                validators: {
                     stringLength: {
                        min: 2,
                    },
                    notEmpty: {
                        message: 'Please supply your last name'
                    }
                }
            },
            email: {
                validators: {
                    notEmpty: {
                        message: 'Please supply your email address'
                    },
                    emailAddress: {
                        message: 'Please supply a valid email address'
                    }
                }
            },
            phone: {
                validators: {
                    notEmpty: {
                        message: 'Please supply your phone number'
                    },
                    phone: {
                        country: 'US',
                        message: 'Please supply a vaild phone number with area code'
                    }
                }
            },
            address: {
                validators: {
                     stringLength: {
                        min: 8,
                    },
                    notEmpty: {
                        message: 'Please supply your street address'
                    }
                }
            },
            city: {
                validators: {
                     stringLength: {
                        min: 4,
                    },
                    notEmpty: {
                        message: 'Please supply your city'
                    }
                }
            },
            state: {
                validators: {
                    notEmpty: {
                        message: 'Please select your state'
                    }
                }
            },
            zip: {
                validators: {
                    notEmpty: {
                        message: 'Please supply your zip code'
                    },
                    zipCode: {
                        country: 'US',
                        message: 'Please supply a vaild zip code'
                    }
                }
            },
            comment: {
                validators: {
                      stringLength: {
                        min: 10,
                        max: 200,
                        message:'Please enter at least 10 characters and no more than 200'
                    },
                    notEmpty: {
                        message: 'Please supply a description of your project'
                    }
                    }
                }
            }
        })
        .on('success.form.bv', function(e) {
            $('#success_message').slideDown({ opacity: "show" }, "slow") // Do something ...
                $('#contact_form').data('bootstrapValidator').resetForm();

            // Prevent form submission
            e.preventDefault();

            // Get the form instance
            var $form = $(e.target);

            // Get the BootstrapValidator instance
            var bv = $form.data('bootstrapValidator');

            // Use Ajax to submit form data
            $.post($form.attr('action'), $form.serialize(), function(result) {
                console.log(result);
            }, 'json');
        });
});
