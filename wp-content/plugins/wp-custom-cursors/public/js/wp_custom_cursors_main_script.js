/*
 * WP Custom Cursors | WordPress Cursor Plugin
 * Author: Web_Trendy
 * Copyright © Web_Trendy 
 *
 * "Open your hands if you want to be held." -Rumi
 *
 */    

(function(){ 

	window.addEventListener('DOMContentLoaded', function(event) {
		window.addEventListener('load', function(event) {
			let stopFlag = false, hoverElementWidth = 0, hoverElementHeight = 0, elementTop = 0, elementLeft = 0, calcTop = 0, calcLeft = 0, paddingTop = 0, paddingLeft = 0;
			const getMousePosition = function(e) {
		        let posx = 0;
		        let posy = 0;
		        posx = e.clientX;
	            posy = e.clientY;
	            let hx = e.clientX;
	            let hy = e.clientY;
	            if (stopFlag) {
	            	hx = elementLeft;
	            	hy = elementTop;
	            }
		        return { x : posx, y : posy, hx:hx, hy:hy }
		    }

		    let mousePosition = {x:0, y:0};

			let body = document.querySelector('body'),
				frames = document.querySelectorAll('iframe'),
				enableCursorActivationMutation = false,
				svgIcons = ['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g><path fill="none" d="M0 0h24v24H0z"/><path d="M10 6v2H5v11h11v-5h2v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h6zm11-3v9l-3.794-3.793-5.999 6-1.414-1.414 5.999-6L12 3h9z"/></g></svg>',
					'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g><path fill="none" d="M0 0h24v24H0z"/><path d="M13.172 12l-4.95-4.95 1.414-1.414L16 12l-6.364 6.364-1.414-1.414z"/></g></svg>',
					'<svg width="17px" height="10px" viewBox="0 0 17 10" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="arrow-left-right-line" transform="translate(-4.000000, -12.000000)"><polygon id="Shape" points="0 0 24 0 24 24 0 24"></polygon><polygon id="Shape" fill="#000000" fill-rule="nonzero" points="16.05 12.05 21 17 16.05 21.95 14.636 20.536 17.172 17.999 4 18 4 16 17.172 16 14.636 13.464"></polygon></g></g></svg>',
					'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g><path fill="none" d="M0 0h24v24H0z"/><path d="M14 12l-4 4V8z"/></g></svg>',
					'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g><path fill="none" d="M0 0h24v24H0z"/><path d="M16.004 9.414l-8.607 8.607-1.414-1.414L14.589 8H7.004V6h11v11h-2V9.414z"/></g></svg>',
					'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g><path fill="none" d="M0 0h24v24H0z"/><path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"/></g></svg>',
					'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g><path fill="none" d="M0 0h24v24H0z"/><path d="M10.13 15.842l-.788 2.94-1.931-.518.787-2.939a10.988 10.988 0 0 1-3.237-1.872l-2.153 2.154-1.415-1.415 2.154-2.153a10.957 10.957 0 0 1-2.371-5.07l.9-.165A16.923 16.923 0 0 0 12 10c3.704 0 7.131-1.185 9.924-3.196l.9.164a10.957 10.957 0 0 1-2.37 5.071l2.153 2.153-1.415 1.415-2.153-2.154a10.988 10.988 0 0 1-3.237 1.872l.787 2.94-1.931.517-.788-2.94a11.072 11.072 0 0 1-3.74 0z"/></g></svg>',
					'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g><path fill="none" d="M0 0h24v24H0z"/><path d="M1.181 12C2.121 6.88 6.608 3 12 3c5.392 0 9.878 3.88 10.819 9-.94 5.12-5.427 9-10.819 9-5.392 0-9.878-3.88-10.819-9zM12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm0-2a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/></g></svg>',
					'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g><path fill="none" d="M0 0h24v24H0z"/><path d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm0 5c-.513 0-1.007.077-1.473.22a2.5 2.5 0 1 1-3.306 3.307A5 5 0 1 0 12 7z"/></g></svg>',
					'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g><path fill="none" d="M0 0h24v24H0z"/><path d="M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z"/></g></svg>',
					'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g><path fill="none" d="M0 0h24v24H0z"/><path d="M13 14h-2a8.999 8.999 0 0 0-7.968 4.81A10.136 10.136 0 0 1 3 18C3 12.477 7.477 8 13 8V3l10 8-10 8v-5z"/></g></svg>',
					'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g><path fill="none" d="M0 0h24v24H0z"/><path d="M13.576 17.271l-5.11-2.787a3.5 3.5 0 1 1 0-4.968l5.11-2.787a3.5 3.5 0 1 1 .958 1.755l-5.11 2.787a3.514 3.514 0 0 1 0 1.458l5.11 2.787a3.5 3.5 0 1 1-.958 1.755z"/></g></svg>',
					'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g><path fill="none" d="M0 0h24v24H0z"/><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-1-5h2v2h-2v-2zm2-1.645V14h-2v-1.5a1 1 0 0 1 1-1 1.5 1.5 0 1 0-1.471-1.794l-1.962-.393A3.501 3.501 0 1 1 13 13.355z"/></g></svg>',
					'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g><path fill="none" d="M0 0h24v24H0z"/><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM11 7h2v2h-2V7zm0 4h2v6h-2v-6z"/></g></svg>',
					'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g><path fill="none" d="M0 0h24v24H0z"/><path d="M4.52 5.934L1.393 2.808l1.415-1.415 19.799 19.8-1.415 1.414-3.31-3.31A10.949 10.949 0 0 1 12 21c-5.392 0-9.878-3.88-10.819-9a10.982 10.982 0 0 1 3.34-6.066zm10.237 10.238l-1.464-1.464a3 3 0 0 1-4.001-4.001L7.828 9.243a5 5 0 0 0 6.929 6.929zM7.974 3.76C9.221 3.27 10.58 3 12 3c5.392 0 9.878 3.88 10.819 9a10.947 10.947 0 0 1-2.012 4.592l-3.86-3.86a5 5 0 0 0-5.68-5.68L7.974 3.761z"/></g></svg>',
					'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0z"/><path d="M10.828 12l4.95 4.95-1.414 1.414L8 12l6.364-6.364 1.414 1.414z"/></svg>',
					'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 62.67 41.48"><defs><style>.cls-1{fill:#fff;}</style></defs><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><g id="Page-1"><g id="Tablet"><g id="Group"><g id="arrow-right-line"><polygon id="Shape" class="cls-1" points="10.21 18.07 24.51 3.77 20.74 0 0 20.74 20.74 41.48 24.51 37.71 10.21 23.41 62.67 23.41 62.67 18.07 10.21 18.07"/></g></g></g></g></g></g></svg>',
					'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0z"/><path d="M8 12l6-6v12z"/></svg>',
					'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0z"/><path d="M9.414 8l8.607 8.607-1.414 1.414L8 9.414V17H6V6h11v2z"/></svg>'
				];

			body.addEventListener('pointermove', function(ev) {mousePosition = getMousePosition(ev)});
 
			// IFrame Stop Cursor
			if (frames.length > 0) {
				[...frames].forEach(function(frame){
					frame.addEventListener('mouseenter', function(){
						body.classList.add('iframe-hover');
					});
					frame.addEventListener('mouseleave', function(){
						body.classList.remove('iframe-hover');
					});
				});
			}


			// For Each Cursor
			[...added_cursors].forEach(function(cursor) {
				let elements = null;

				// Activate Cursor on Body
				if (cursor.activate_on == 0) {
					elements = document.querySelectorAll("body");
				} 

				// Activate Cursor on Elements
				else {
					enableCursorActivationMutation = true;
					switch (cursor.selector_type) {
						case 'tag':
							elements = document.querySelectorAll(cursor.selector_data);
					    break;

					    case 'class':
						    elements = document.querySelectorAll("." + cursor.selector_data);
					    break;

					    case 'id':
						    elements = document.querySelectorAll("#" + cursor.selector_data);
					    break;

					    case 'attribute':
						    elements = document.querySelectorAll("[" + cursor.selector_data + "]");
					    break;
					}
				}

				if (elements != null && elements.length > 0) {
					[...elements].forEach(function(element){
						createCursor(element, cursor);
					});
				}

			});

			function createCursor(element, cursor) {
				let cursorWrapper = document.createElement('div'),
					cursorEl1 = document.createElement('div'), 
					cursorEl2 = document.createElement('div'),
					hoverCursors = cursor.hover_cursors ? JSON.parse(cursor.hover_cursors) : null,
					mouseEntered = false, hoverEntered = false;

				cursorEl1.classList.add('cursor-el1');
				cursorEl2.classList.add('cursor-el2');

				if (cursor.cursor_type == 'shape') {
					cursorWrapper.classList.add(`cursor-${cursor.cursor_shape}`);
				}

				// Mobile & Tablet Hide
				if (cursor.hide_tablet == "on") {
					cursorWrapper.classList.add('hide-tablet');						
				}

				if (cursor.hide_mobile == "on") {
					cursorWrapper.classList.add('hide-mobile');						
				}

				cursorWrapper.classList.add('wpcc-cursor');
				cursorWrapper.classList.add('no-transition');
				
				cursorWrapper.appendChild(cursorEl1);
				cursorWrapper.appendChild(cursorEl2);

				body.appendChild(cursorWrapper);

				if (cursor.cursor_shape.includes('created')) {
					let createdCursorId = cursor.cursor_shape.substring(8);
					[...created_cursors].forEach(function(createdCursor){
						if (createdCursor.cursor_id == createdCursorId) {
							let feWidth, seWidth, feHeight, seHeight;

							switch(createdCursor.cursor_type){
							  case 'shape':
							    feWidth = cursor.width;
								seWidth = (cursor.width * createdCursor.cursor_options.se_width) / createdCursor.cursor_options.fe_width;
								feHeight = (cursor.width * createdCursor.cursor_options.fe_height) / createdCursor.cursor_options.fe_width;
								seHeight = (cursor.width * createdCursor.cursor_options.se_height) / createdCursor.cursor_options.fe_width;

								cursorWrapper.style.setProperty('--fe-width', feWidth + "px");
								cursorWrapper.style.setProperty('--fe-height', feHeight + "px");
								cursorWrapper.style.setProperty('--fe-color', createdCursor.cursor_options.fe_color);
								cursorWrapper.style.setProperty('--fe-border-width', createdCursor.cursor_options.fe_border_width + "px");
								cursorWrapper.style.setProperty('--fe-border-radius', createdCursor.cursor_options.fe_radius + "px");
								cursorWrapper.style.setProperty('--fe-border-color', createdCursor.cursor_options.fe_border_color);
								cursorWrapper.style.setProperty('--fe-transition-duration', createdCursor.cursor_options.fe_duration + "ms");
								cursorWrapper.style.setProperty('--fe-transition-timing', createdCursor.cursor_options.fe_timing);
								cursorWrapper.style.setProperty('--fe-blending-mode', createdCursor.cursor_options.fe_blending);
								cursorWrapper.style.setProperty('--fe-zindex', createdCursor.cursor_options.fe_zindex);
								cursorWrapper.style.setProperty('--fe-backdrop', `${createdCursor.cursor_options.fe_backdrop}(${createdCursor.cursor_options.fe_backdrop_value})`);

								cursorWrapper.style.setProperty('--se-width', seWidth + "px");
								cursorWrapper.style.setProperty('--se-height', seHeight + "px");
								cursorWrapper.style.setProperty('--se-color', createdCursor.cursor_options.se_color);
								cursorWrapper.style.setProperty('--se-border-width', createdCursor.cursor_options.se_border_width + "px");
								cursorWrapper.style.setProperty('--se-border-radius', createdCursor.cursor_options.se_radius + "px");
								cursorWrapper.style.setProperty('--se-border-color', createdCursor.cursor_options.se_border_color);
								cursorWrapper.style.setProperty('--se-transition-duration', createdCursor.cursor_options.se_duration + "ms");
								cursorWrapper.style.setProperty('--se-transition-timing', createdCursor.cursor_options.se_timing);
								cursorWrapper.style.setProperty('--se-blending-mode', createdCursor.cursor_options.se_blending);
								cursorWrapper.style.setProperty('--se-zindex', createdCursor.cursor_options.se_zindex);
								cursorWrapper.style.setProperty('--se-backdrop', `${createdCursor.cursor_options.se_backdrop}(${createdCursor.cursor_options.se_backdrop_value})`);
							  break;
							  case 'image':
							    let imageCursor = document.createElement('img');
								imageCursor.setAttribute('src', createdCursor.cursor_options.image_url);
								cursorEl1.appendChild(imageCursor);
								cursorWrapper.classList.add('cursor-image');

								let clickPointOption = createdCursor.cursor_options.click_point.split(','),
								clickPointX = ( Number(clickPointOption[0]) * Number(createdCursor.cursor_options.width) ) / 100,
								clickPointY = ( Number(clickPointOption[1]) * Number(createdCursor.cursor_options.height) ) / 100; 

								cursorWrapper.style.setProperty('--width', createdCursor.cursor_options.width + "px");
								cursorWrapper.style.setProperty('--color', createdCursor.cursor_options.color);
								cursorWrapper.style.setProperty('--radius', createdCursor.cursor_options.radius + "px");
								if (createdCursor.cursor_options.background != 'off') {
									cursorWrapper.style.setProperty('--padding', createdCursor.cursor_options.padding + "px");
									paddingTop = createdCursor.cursor_options.padding;
									paddingLeft = createdCursor.cursor_options.padding;
								}

								calcTop = ( Number(paddingTop) + clickPointY ) * -1;
								calcLeft = ( Number(paddingLeft) + clickPointX ) * -1;

								cursorWrapper.style.setProperty('--blending', createdCursor.cursor_options.blending);

							  break;
							  case 'text':
							  	if (createdCursor.cursor_options.text_type == 'horizontal') {
							  		let hrDom = document.createElement('div');
							    	hrDom.classList.add('horizontal-text');
							    	hrDom.innerHTML = createdCursor.cursor_options.hr_text;
							    	cursorEl1.appendChild(hrDom);
							    	cursorWrapper.classList.add('cursor-text');
							    	cursorEl1.firstChild.style.setProperty('--hr-width', createdCursor.cursor_options.hr_width + "px");
							    	cursorEl1.firstChild.style.setProperty('--hr-transform', createdCursor.cursor_options.hr_transform);
							    	cursorEl1.firstChild.style.setProperty('--hr-size', createdCursor.cursor_options.hr_size + "px");
							    	cursorEl1.firstChild.style.setProperty('--hr-weight', createdCursor.cursor_options.hr_weight);
							    	cursorEl1.firstChild.style.setProperty('--bg-color', createdCursor.cursor_options.hr_bgcolor);
							    	cursorEl1.firstChild.style.setProperty('--hr-size', createdCursor.cursor_options.hr_size + "px");
							    	cursorEl1.firstChild.style.setProperty('--hr-spacing', createdCursor.cursor_options.hr_spacing + "px");
							    	cursorEl1.firstChild.style.setProperty('--hr-radius', createdCursor.cursor_options.hr_radius + "px");
							    	cursorEl1.firstChild.style.setProperty('--hr-padding', createdCursor.cursor_options.hr_padding + "px");
							    	cursorEl1.firstChild.style.setProperty('--hr-backdrop', createdCursor.cursor_options.hr_backdrop + "(" + createdCursor.cursor_options.hr_backdrop_amount + ")");
							    	cursorEl1.firstChild.style.setProperty('--hr-color', createdCursor.cursor_options.hr_color);
							    	cursorWrapper.style.setProperty('--duration', createdCursor.cursor_options.hr_duration + "ms");
							    	cursorWrapper.style.setProperty('--timing', createdCursor.cursor_options.hr_timing);
							  	}
							  	else {
								  	let svgString = `<svg viewBox="0 0 500 500"><path d="M50,250c0-110.5,89.5-200,200-200s200,89.5,200,200s-89.5,200-200,200S50,360.5,50,250" id="textcircle" fill="none"></path><text dy="25"><textPath xlink:href="#textcircle">${createdCursor.cursor_options.text}</textPath></text><circle cx="250" cy="250" r="${createdCursor.cursor_options.dot_width}" id="svg_circle_node"/></svg>`;
							    	
							    	cursorEl1.innerHTML = svgString;
							    	cursorWrapper.classList.add('cursor-text');
							    	cursorEl1.firstChild.style.setProperty('--dot-fill', createdCursor.cursor_options.dot_color);
							    	cursorEl1.firstChild.style.setProperty('--text-width', createdCursor.cursor_options.width + "px");
							    	cursorEl1.firstChild.style.setProperty('--text-transform', createdCursor.cursor_options.text_transform);
							    	cursorEl1.firstChild.style.setProperty('--font-weight', createdCursor.cursor_options.font_weight);
							    	cursorEl1.firstChild.style.setProperty('--text-color', createdCursor.cursor_options.text_color);
							    	cursorEl1.firstChild.style.setProperty('--font-size', createdCursor.cursor_options.font_size + "px");
							    	cursorEl1.firstChild.style.setProperty('--word-spacing', createdCursor.cursor_options.word_spacing + "px");
							    	cursorEl1.firstChild.style.setProperty('--animation-name', createdCursor.cursor_options.animation);
							    	cursorEl1.firstChild.style.setProperty('--animation-duration', createdCursor.cursor_options.animation_duration + "s");
							    	cursorEl1.firstChild.style.setProperty('--dot-width', createdCursor.cursor_options.dot_width + "px");
						    	}
							  break;
							}

						}
					});
				}
				else {
					cursorWrapper.style.setProperty('--fe-width', cursor.width + "px");	
					cursorWrapper.style.setProperty('--fe-height', cursor.width + "px");	
					cursorWrapper.style.setProperty('--se-width', cursor.width + "px");	
					cursorWrapper.style.setProperty('--se-height', cursor.width + "px");
					cursorWrapper.style.setProperty('--fe-border-radius', "50%");	
					cursorWrapper.style.setProperty('--fe-color', cursor.color);
					cursorWrapper.style.setProperty('--se-color', cursor.color);
					cursorWrapper.style.setProperty('--fe-blending-mode', cursor.blending_mode);
					cursorWrapper.style.setProperty('--se-blending-mode', cursor.blending_mode);
				}

				// Show Default Cursor
				if ( !Number(cursor.default_cursor) ) {
					element.classList.add('no-cursor');
				}
				else {
					element.classList.add('default-cursor');
				}

				if (hoverCursors) {
					hoverCursors.forEach(function(hoverCursor) {
						switch (hoverCursor.hoverType) {
							case 'default':
								hoverCursor.selector.forEach(function(hoverSelector){
									let hoverElements = document.querySelectorAll(`${hoverSelector}`);
									[...hoverElements].forEach(function(el){
										el.addEventListener('mouseenter', function(){
											cursorWrapper.classList.add('link-hover');
										});
										el.addEventListener('mouseleave', function(){
											cursorWrapper.classList.remove('link-hover');
										});
									});
								});
							break;
							case 'snap':
								hoverCursor.selector.forEach(function(hoverSelector){
									let hoverElements = document.querySelectorAll(`${hoverSelector}`);
									[...hoverElements].forEach(function(el){
										el.addEventListener('mouseenter', function(){
											stopFlag = true;
								        	let elementPos = el.getBoundingClientRect();
								        	elementTop = elementPos.top;
								        	elementLeft = elementPos.left;
								        	hoverElementWidth = elementPos.width;
								        	hoverElementHeight = elementPos.height;
								        	cursorWrapper.style.setProperty('--fe-width', hoverElementWidth + "px");
								        	cursorWrapper.style.setProperty('--fe-height', hoverElementHeight + "px");
								        	cursorWrapper.style.setProperty('--fe-border-radius', "0");
								        	cursorEl1.style.top = 0;
								        	cursorEl1.style.left = 0;
								        	cursorEl1.style.borderWidth = '1px';
										});
										el.addEventListener('mouseleave', function(){
											stopFlag = false;
								        	cursorWrapper.style.setProperty('--fe-width', cursor.width + "px");
								        	cursorWrapper.style.setProperty('--fe-height', cursor.width + "px");
								        	cursorWrapper.style.setProperty('--fe-border-radius', "50%");
								        	cursorEl1.style.removeProperty('top');
								        	cursorEl1.style.removeProperty('left');
								        	cursorEl1.style.removeProperty('border-width');
										});
									});
								});
							break;
							case 'available':
								let hoverCursorWrapper = document.createElement('div'),
									hoverCursorIcon = document.createElement('div'), 
									hoverCursorText = document.createElement('div');
								
								hoverCursorWrapper.classList.add('hover-cursor');
								hoverCursorWrapper.classList.add(`hc-${hoverCursor.cursor}`);
								hoverCursorIcon.classList.add('hover-cursor-icon');

								if (hoverCursor.cursor == 1) {
									if (hoverCursor.cursorIcon) {
										let hoverCursorIconFile = document.createElement('img');
										hoverCursorIconFile.setAttribute('src', hoverCursor.cursorIcon);
										hoverCursorIcon.appendChild(hoverCursorIconFile);
									}
									else {
										hoverCursorIcon.innerHTML = svgIcons[hoverCursor.cursor - 1];
									}
								}
								else {
									hoverCursorIcon.innerHTML = svgIcons[hoverCursor.cursor - 1];
								}

								hoverCursorText.classList.add('hover-cursor-text');
								if (hoverCursor.cursorText) {
									hoverCursorText.innerHTML = hoverCursor.cursorText;
								}

								hoverCursorWrapper.appendChild(hoverCursorIcon);
								hoverCursorWrapper.appendChild(hoverCursorText);
								body.appendChild(hoverCursorWrapper);
								hoverCursorWrapper.style.setProperty('--hc-bgcolor', hoverCursor.bgColor);
								hoverCursorWrapper.style.setProperty('--hc-width', hoverCursor.width + "px");

								requestAnimationFrame(function() {renderHoverCursor()});
								function renderHoverCursor() {
						   			hoverCursorWrapper.style.transform = `translate(${mousePosition.x}px, ${mousePosition.y}px)`;
									requestAnimationFrame(function() { renderHoverCursor()});
								}

								hoverCursor.selector.forEach(function(hoverSelector){
									let hoverElements = document.querySelectorAll(`${hoverSelector}`);
									[...hoverElements].forEach(function(el){
										el.addEventListener('mouseenter', function(){
											hoverCursorWrapper.classList.add('active');
											hoverEntered = true;
											cursorWrapper.classList.remove('active');
											mouseEntered = false;
										});
										el.addEventListener('mouseleave', function(){
											hoverCursorWrapper.classList.remove('active');
											hoverEntered = false;
											cursorWrapper.classList.add('active');
											mouseEntered = true;
										});
										el.addEventListener('pointermove', function(){
											if (!mouseEntered && !hoverEntered) {
												hoverEntered = true;
												hoverCursorWrapper.classList.add('active');
											}
										});
									});
								});
							break;
						}
					});
				}
				// If no hover cursor is added
				else {
					let innerLinks = element.querySelectorAll('a');
					[...innerLinks].forEach(function(link) {
				        link.addEventListener('mouseenter', function() {
				        	cursorWrapper.classList.add('link-hover');
				        } );
				        link.addEventListener('mouseleave', function() {
				        	cursorWrapper.classList.remove('link-hover');
				        } );
				    }); 
				}

				element.addEventListener('mouseenter', function() {
					mouseEntered = true;
					cursorWrapper.classList.add('active');
				});

				element.addEventListener('mouseleave', function() {
					mouseEntered = false;
					cursorWrapper.classList.remove('active');
				}); 

				element.addEventListener('pointermove', function() {

					if (!mouseEntered && !hoverEntered) {
						mouseEntered = true;
						cursorWrapper.classList.add('active');
					}

					requestAnimationFrame(function() {renderCursor()});
					function renderCursor() {
			   			cursorEl1.style.transform = `translate(${mousePosition.hx + calcLeft}px, ${mousePosition.hy + calcTop}px)`;
			   			cursorEl2.style.transform = `translate(${mousePosition.x}px, ${mousePosition.y}px)`;

						requestAnimationFrame(function() { renderCursor()});
					}
					
					window.setTimeout(function(){
						cursorWrapper.classList.remove('no-transition');
					}, 1000);
					
				});

				var innerInputs = element.querySelectorAll('input[type="text"], input[type="email"], input[type="search"], input[type="number"], input[type="password"], input[type="url"], input[type="date"], input[type="range"], textarea');	
			    [...innerInputs].forEach(function(input) {
			        input.addEventListener('mouseenter', function() {
			        	cursorWrapper.classList.add('input-hover');
			        } );
			        input.addEventListener('mouseleave', function() {
			        	cursorWrapper.classList.remove('input-hover');
			        } );
			    });
					
			}



			// Mutation Observer For Cursor Activation
			if (enableCursorActivationMutation) {
				let observerOptions = {
                    childList: true,
                    subtree: true,
                },
                observer = new MutationObserver(callback);

                function callback(mutations) {
                    for (let mutation of mutations) {
                        if (mutation.type === 'childList') {
                            for(let addedNode of mutation.addedNodes) {
                            	if (addedNode.nodeType == Node.ELEMENT_NODE) {
                            		[...added_cursors].forEach(function(cursor) { 
										let selector = "";
										switch (cursor.selector_type) {
											case 'tag':
												selector = cursor.selector_data;
										    break;

										    case 'class':
											    selector = '.' + cursor.selector_data;
										    break;

										    case 'id':
											    selector = '#' + cursor.selector_data;
										    break;

										    case 'attribute':
											    selector = '[' + cursor.selector_data + ']';
										    break;
										}
										// Cursor is added for addedNode
		                                if (addedNode.matches(selector)) {
		                                    createCursor(addedNode, cursor);
		                                }
		                                // Cursor is added for children of addedNode
		                                let childNodes = addedNode.querySelectorAll(selector);
		                                if (childNodes != null && childNodes.length > 0) {
		                                	[...childNodes].forEach(function(el) {
		                                		createCursor(el, cursor);
		                                	});
		                                }
									});
                            	} 
                            }
                        }
                    }
                }
                observer.observe(body, observerOptions);
			}

		});
	});
})();



/* :) Let's meke internet BEAUTIFUL*/
/*
 _       __     __       ______                    __
| |     / /__  / /_     /_  __/_______  ____  ____/ /_  __
| | /| / / _ \/ __ \     / / / ___/ _ \/ __ \/ __  / / / /
| |/ |/ /  __/ /_/ /    / / / /  /  __/ / / / /_/ / /_/ /
|__/|__/\___/_.___/    /_/ /_/   \___/_/ /_/\__,_/\__, /
                                                 /____/
*/