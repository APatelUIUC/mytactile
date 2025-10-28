/*
 * Tactile-JS
 * Copyright 2020 Craig S. Kaplan, csk@uwaterloo.ca
 *
 * Distributed under the terms of the 3-clause BSD license.  See the
 * file "LICENSE" for more information.
 */

// A minimal demo that constructs a random tiling with random edge
// shapes and then draws it, using no external library dependencies 
// other than Tactile itself.

'use strict'

import { mul, EdgeShape, numTypes, tilingTypes, IsohedralTiling } 
	from '../lib/tactile.js';

const DEFAULT_CANVAS_SCALE = [ 50.0, 0.0, 0.0, 0.0, 50.0, 0.0 ];

let tilingState = null;

function createTilingState()
{
	const tp = tilingTypes[ Math.floor( numTypes * Math.random() ) ];
	let tiling = new IsohedralTiling( tp );

	let params = tiling.getParameters();
	for( let i = 0; i < params.length; ++i ) {
		params[i] += Math.random() * 0.1 - 0.05;
	}
	tiling.setParameters( params );

	let baseEdges = [];
	for( let idx = 0; idx < tiling.numEdgeShapes(); ++idx ) {
		const shape = tiling.getEdgeShape( idx );
		if( shape == EdgeShape.I ) {
			baseEdges.push( { shape: shape, cp: [] } );
		} else if( shape == EdgeShape.J ) {
			baseEdges.push( {
				shape: shape,
				cp: [
					{ x: Math.random() * 0.6, y: Math.random() - 0.5 },
					{ x: Math.random() * 0.6 + 0.4, y: Math.random() - 0.5 }
				]
			} );
		} else if( shape == EdgeShape.S || shape == EdgeShape.U ) {
			baseEdges.push( {
				shape: shape,
				cp: [
					{ x: Math.random() * 0.6, y: Math.random() - 0.5 }
				]
			} );
		}
	}

	let colours = [];
	for( let i = 0; i < 3; ++i ) {
		colours.push( 'rgb(' +
			Math.floor( Math.random() * 255.0 ) + ',' +
			Math.floor( Math.random() * 255.0 ) + ',' +
			Math.floor( Math.random() * 255.0 ) + ')' );
	}

	return { tiling: tiling, baseEdges: baseEdges, colours: colours };
}

function buildEdges( baseEdges, multiplier )
{
	let edges = [];
	for( let idx = 0; idx < baseEdges.length; ++idx ) {
		const info = baseEdges[idx];
		const shape = info.shape;

		if( shape == EdgeShape.I ) {
			edges.push( [] );
		} else if( shape == EdgeShape.J ) {
			const cp0 = info.cp[0];
			const cp1 = info.cp[1];
			edges.push( [
				{ x: cp0.x, y: cp0.y * multiplier },
				{ x: cp1.x, y: cp1.y * multiplier }
			] );
		} else if( shape == EdgeShape.S ) {
			const cp0 = info.cp[0];
			const cy = cp0.y * multiplier;
			edges.push( [
				{ x: cp0.x, y: cy },
				{ x: 1.0 - cp0.x, y: -cy }
			] );
		} else if( shape == EdgeShape.U ) {
			const cp0 = info.cp[0];
			const cy = cp0.y * multiplier;
			edges.push( [
				{ x: cp0.x, y: cy },
				{ x: 1.0 - cp0.x, y: cy }
			] );
		}
	}
	return edges;
}

function renderTiling( multiplier )
{
	if( !tilingState ) {
		tilingState = createTilingState();
	}

	const canvas = document.getElementById( 'canvas' );
	const ctx = canvas.getContext( '2d' );
	ctx.clearRect( 0, 0, canvas.width, canvas.height );

	const tiling = tilingState.tiling;
	const edges = buildEdges( tilingState.baseEdges, multiplier );
	const cols = tilingState.colours;

	ctx.lineWidth = 1.0;
	ctx.strokeStyle = '#000';

	for( let i of tiling.fillRegionBounds( -2, -2, 12, 12 ) ) {
		const T = mul( DEFAULT_CANVAS_SCALE, i.T );
		ctx.fillStyle = cols[ tiling.getColour( i.t1, i.t2, i.aspect ) ];

		let start = true;
		ctx.beginPath();

		for( let si of tiling.shape() ) {
			const S = mul( T, si.T );
			let seg = [ mul( S, { x: 0.0, y: 0.0 } ) ];

			if( si.shape != EdgeShape.I ) {
				const ej = edges[ si.id ];
				seg.push( mul( S, ej[0] ) );
				seg.push( mul( S, ej[1] ) );
			}

			seg.push( mul( S, { x: 1.0, y: 0.0 } ) );

			if( si.rev ) {
				seg = seg.reverse();
			}

			if( start ) {
				start = false;
				ctx.moveTo( seg[0].x, seg[0].y );
			}

			if( seg.length == 2 ) {
				ctx.lineTo( seg[1].x, seg[1].y );
			} else {
				ctx.bezierCurveTo(
					seg[1].x, seg[1].y,
					seg[2].x, seg[2].y,
					seg[3].x, seg[3].y );
			}
		}

		ctx.closePath();
		ctx.fill();
		ctx.stroke();
	}
}

function updateFromSlider()
{
	const slider = document.getElementById( 'curveSlider' );
	const multiplier = Number( slider.value ) / 100.0;
	document.getElementById( 'curveValue' ).textContent = multiplier.toFixed( 2 );
	renderTiling( multiplier );
}

function setup()
{
	tilingState = createTilingState();
	const slider = document.getElementById( 'curveSlider' );
	slider.addEventListener( 'input', updateFromSlider );
	updateFromSlider();
}

window.addEventListener( 'DOMContentLoaded', setup );
