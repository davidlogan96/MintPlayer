﻿using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using MintPlayer.Data.Helpers;
using MintPlayer.Data.Options;
using MintPlayer.Data.Repositories;
using MintPlayer.Data.Services;
using System;
using System.Collections.Generic;
using System.Text;

namespace MintPlayer.Data.Extensions
{
    public static class MintPlayerExtensions
    {
        public static IServiceCollection AddMintPlayer(this IServiceCollection services, Action<MintPlayerOptions> options)
        {
            var opt = new MintPlayerOptions();
            options(opt);

            services
                .AddDbContext<MintPlayerContext>(options =>
                {
                    options.UseSqlServer(opt.ConnectionString);
                });
			
			services.AddIdentity<Entities.User, Entities.Role>()
				.AddEntityFrameworkStores<MintPlayerContext>()
				.AddDefaultTokenProviders();

			services
				// Repositories
				.AddScoped<IAccountRepository, AccountRepository>()
				.AddScoped<IArtistRepository, ArtistRepository>()
				.AddScoped<IMediumRepository, MediumRepository>()
				.AddScoped<IMediumTypeRepository, MediumTypeRepository>()
				.AddScoped<IPersonRepository, PersonRepository>()
				.AddScoped<IRoleRepository, RoleRepository>()
				.AddScoped<ISongRepository, SongRepository>()
				.AddScoped<ISubjectRepository, SubjectRepository>()
				.AddScoped<IPlaylistRepository, PlaylistRepository>()
				.AddScoped<ITagCategoryRepository, TagCategoryRepository>()
				.AddScoped<ITagRepository, TagRepository>()
				.AddScoped<Repositories.Jobs.IElasticSearchJobRepository, Repositories.Jobs.ElasticSearchJobRepository>()
				.AddScoped<Repositories.Blog.IBlogPostRepository, Repositories.Blog.BlogPostRepository>()
				// Services
				.AddScoped<IAccountService, AccountService>()
				.AddScoped<IArtistService, ArtistService>()
				.AddScoped<IMediumTypeService, MediumTypeService>()
				.AddScoped<IPersonService, PersonService>()
				.AddScoped<ISongService, SongService>()
				.AddScoped<ISubjectService, SubjectService>()
				.AddScoped<IPlaylistService, PlaylistService>()
				.AddScoped<ITagCategoryService, TagCategoryService>()
				.AddScoped<ITagService, TagService>()
				.AddScoped<IBlogPostService, BlogPostService>()
				// Helpers
				.AddTransient<ArtistHelper>()
				.AddTransient<SongHelper>()
				.AddTransient<SubjectHelper>()
				.AddTransient<TrackHelper>();

			return services;
		}
    }
}
