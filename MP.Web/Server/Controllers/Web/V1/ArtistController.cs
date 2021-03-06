﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MintPlayer.Dtos.Dtos;
using MintPlayer.Data.Repositories;
using MintPlayer.Data.Services;

namespace MintPlayer.Web.Server.Controllers.Web.V1
{
	[Controller]
	[Route("web/v1/[controller]")]
	public class ArtistController : Controller
	{
		private IArtistService artistService;
		public ArtistController(IArtistService artistService)
		{
			this.artistService = artistService;
		}

		// POST: web/Artist/page
		[HttpPost("page", Name = "web-v1-artist-page")]
		public async Task<ActionResult<Pagination.PaginationResponse<Artist>>> PageArtists([FromBody] Pagination.PaginationRequest<Artist> request)
		{
			var artists = await artistService.PageArtists(request);
			return Ok(artists);
		}

		// GET: web/Artist
		[HttpGet(Name = "web-v1-artist-list")]
		public async Task<ActionResult<IEnumerable<Artist>>> Get([FromHeader]bool include_relations = false)
		{
			var artists = await artistService.GetArtists(include_relations, false);
			return Ok(artists);
		}

		// GET: web/Artist/5
		[HttpGet("{id}", Name = "web-v1-artist-get", Order = 1)]
		public async Task<ActionResult<Artist>> Get(int id, [FromHeader]bool include_relations = false)
		{
			var artist = await artistService.GetArtist(id, include_relations, false);
			return Ok(artist);
		}

		// POST: web/Artist
		[HttpPost(Name = "web-v1-artist-create")]
		[Authorize]
		public async Task<ActionResult<Artist>> Post([FromBody] Artist artist)
		{
			var new_artist = await artistService.InsertArtist(artist);
			return Ok(new_artist);
		}

		// PUT: web/Artist/5
		[HttpPut("{id}", Name = "web-v1-artist-update")]
		[Authorize]
		public async Task<ActionResult<Artist>> Put(int id, [FromBody] Artist artist)
		{
			var updated_artist = await artistService.UpdateArtist(artist);
			return Ok(updated_artist);
		}

		// DELETE: web/Artist/5
		[HttpDelete("{id}", Name = "web-v1-artist-delete")]
		[Authorize]
		public async Task<ActionResult> Delete(int id)
		{
			await artistService.DeleteArtist(id);
			return Ok();
		}
	}
}