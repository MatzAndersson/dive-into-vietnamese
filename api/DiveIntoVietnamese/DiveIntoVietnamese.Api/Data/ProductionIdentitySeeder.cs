using DiveIntoVietnamese.Api.Features.Auth;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace DiveIntoVietnamese.Api.Data
{
    public static class ProductionIdentitySeeder
    {
        private static readonly string[] Roles =
        [
            "Admin",
            "Teacher"
        ];

        public static async Task SeedAsync(
            IServiceProvider services,
            IConfiguration configuration)
        {
            var logger = services
                .GetRequiredService<ILoggerFactory>()
                .CreateLogger("ProductionIdentitySeeder");

            var roleManager = services.GetRequiredService<RoleManager<IdentityRole>>();
            var userManager = services.GetRequiredService<UserManager<ApplicationUser>>();

            var adminEmail = configuration["SeedAdmin:Email"];
            var adminPassword = configuration["SeedAdmin:Password"];

            if (string.IsNullOrWhiteSpace(adminEmail))
            {
                throw new InvalidOperationException("SeedAdmin:Email is missing.");
            }

            if (string.IsNullOrWhiteSpace(adminPassword))
            {
                throw new InvalidOperationException("SeedAdmin:Password is missing.");
            }

            adminEmail = adminEmail.Trim();

            foreach (var roleName in Roles)
            {
                if (await roleManager.RoleExistsAsync(roleName))
                {
                    logger.LogInformation("Role already exists: {RoleName}", roleName);
                    continue;
                }

                var createRoleResult = await roleManager.CreateAsync(new IdentityRole(roleName));

                if (!createRoleResult.Succeeded)
                {
                    throw new InvalidOperationException(
                        $"Could not create role '{roleName}': {FormatErrors(createRoleResult)}");
                }

                logger.LogInformation("Created role: {RoleName}", roleName);
            }

            var adminUser = await userManager.FindByEmailAsync(adminEmail);

            if (adminUser is null)
            {
                adminUser = new ApplicationUser
                {
                    UserName = adminEmail,
                    Email = adminEmail,
                    EmailConfirmed = true
                };

                var createUserResult = await userManager.CreateAsync(adminUser, adminPassword);

                if (!createUserResult.Succeeded)
                {
                    throw new InvalidOperationException(
                        $"Could not create admin user: {FormatErrors(createUserResult)}");
                }

                logger.LogInformation("Created production admin user: {AdminEmail}", adminEmail);
            }
            else
            {
                var changed = false;

                if (!adminUser.EmailConfirmed)
                {
                    adminUser.EmailConfirmed = true;
                    changed = true;
                }

                if (adminUser.UserName != adminEmail)
                {
                    adminUser.UserName = adminEmail;
                    changed = true;
                }

                if (adminUser.Email != adminEmail)
                {
                    adminUser.Email = adminEmail;
                    changed = true;
                }

                if (changed)
                {
                    var updateUserResult = await userManager.UpdateAsync(adminUser);

                    if (!updateUserResult.Succeeded)
                    {
                        throw new InvalidOperationException(
                            $"Could not update admin user: {FormatErrors(updateUserResult)}");
                    }

                    logger.LogInformation("Updated existing production admin user: {AdminEmail}", adminEmail);
                }
                else
                {
                    logger.LogInformation("Admin user already exists: {AdminEmail}", adminEmail);
                }
            }

            if (!await userManager.IsInRoleAsync(adminUser, "Admin"))
            {
                var addToRoleResult = await userManager.AddToRoleAsync(adminUser, "Admin");

                if (!addToRoleResult.Succeeded)
                {
                    throw new InvalidOperationException(
                        $"Could not assign Admin role: {FormatErrors(addToRoleResult)}");
                }

                logger.LogInformation("Assigned Admin role to: {AdminEmail}", adminEmail);
            }
            else
            {
                logger.LogInformation("Admin user already has Admin role: {AdminEmail}", adminEmail);
            }

            logger.LogInformation("Production identity seeding completed successfully.");
        }

        public static async Task ResetAdminPasswordAsync(
            IServiceProvider services,
            IConfiguration configuration)
        {
            var logger = services
                .GetRequiredService<ILoggerFactory>()
                .CreateLogger("ProductionIdentitySeeder");

            var userManager = services.GetRequiredService<UserManager<ApplicationUser>>();

            var adminEmail = configuration["SeedAdmin:Email"];
            var newAdminPassword = configuration["SeedAdmin:Password"];

            if (string.IsNullOrWhiteSpace(adminEmail))
            {
                throw new InvalidOperationException("SeedAdmin:Email is missing.");
            }

            if (string.IsNullOrWhiteSpace(newAdminPassword))
            {
                throw new InvalidOperationException("SeedAdmin:Password is missing.");
            }

            adminEmail = adminEmail.Trim();

            var adminUser = await userManager.FindByEmailAsync(adminEmail);

            if (adminUser is null)
            {
                throw new InvalidOperationException(
                    $"No admin user was found with email '{adminEmail}'.");
            }

            foreach (var passwordValidator in userManager.PasswordValidators)
            {
                var validationResult = await passwordValidator.ValidateAsync(
                    userManager,
                    adminUser,
                    newAdminPassword);

                if (!validationResult.Succeeded)
                {
                    throw new InvalidOperationException(
                        $"New admin password is invalid: {FormatErrors(validationResult)}");
                }
            }

            adminUser.PasswordHash = userManager.PasswordHasher.HashPassword(
                adminUser,
                newAdminPassword);

            adminUser.SecurityStamp = Guid.NewGuid().ToString("N");

            var updateResult = await userManager.UpdateAsync(adminUser);

            if (!updateResult.Succeeded)
            {
                throw new InvalidOperationException(
                    $"Could not reset admin password: {FormatErrors(updateResult)}");
            }

            logger.LogInformation(
                "Production admin password was reset successfully for: {AdminEmail}",
                adminEmail);
        }

        public static async Task SeedTeacherAsync(
            IServiceProvider services,
            IConfiguration configuration)
        {
            var logger = services
                .GetRequiredService<ILoggerFactory>()
                .CreateLogger("ProductionIdentitySeeder");

            var roleManager = services.GetRequiredService<RoleManager<IdentityRole>>();
            var userManager = services.GetRequiredService<UserManager<ApplicationUser>>();

            var teacherEmail = configuration["SeedTeacher:Email"];
            var teacherPassword = configuration["SeedTeacher:Password"];

            if (string.IsNullOrWhiteSpace(teacherEmail))
            {
                throw new InvalidOperationException("SeedTeacher:Email is missing.");
            }

            if (string.IsNullOrWhiteSpace(teacherPassword))
            {
                throw new InvalidOperationException("SeedTeacher:Password is missing.");
            }

            teacherEmail = teacherEmail.Trim();

            const string teacherRole = "Teacher";

            if (!await roleManager.RoleExistsAsync(teacherRole))
            {
                var createRoleResult = await roleManager.CreateAsync(new IdentityRole(teacherRole));

                if (!createRoleResult.Succeeded)
                {
                    throw new InvalidOperationException(
                        $"Could not create Teacher role: {FormatErrors(createRoleResult)}");
                }

                logger.LogInformation("Created role: {RoleName}", teacherRole);
            }

            var teacherUser = await userManager.FindByEmailAsync(teacherEmail);

            if (teacherUser is null)
            {
                teacherUser = new ApplicationUser
                {
                    UserName = teacherEmail,
                    Email = teacherEmail,
                    EmailConfirmed = true
                };

                var createUserResult = await userManager.CreateAsync(teacherUser, teacherPassword);

                if (!createUserResult.Succeeded)
                {
                    throw new InvalidOperationException(
                        $"Could not create teacher user: {FormatErrors(createUserResult)}");
                }

                logger.LogInformation("Created production teacher user: {TeacherEmail}", teacherEmail);
            }
            else
            {
                var changed = false;

                if (!teacherUser.EmailConfirmed)
                {
                    teacherUser.EmailConfirmed = true;
                    changed = true;
                }

                if (teacherUser.UserName != teacherEmail)
                {
                    teacherUser.UserName = teacherEmail;
                    changed = true;
                }

                if (teacherUser.Email != teacherEmail)
                {
                    teacherUser.Email = teacherEmail;
                    changed = true;
                }

                if (changed)
                {
                    var updateUserResult = await userManager.UpdateAsync(teacherUser);

                    if (!updateUserResult.Succeeded)
                    {
                        throw new InvalidOperationException(
                            $"Could not update teacher user: {FormatErrors(updateUserResult)}");
                    }

                    logger.LogInformation("Updated existing production teacher user: {TeacherEmail}", teacherEmail);
                }
                else
                {
                    logger.LogInformation("Teacher user already exists: {TeacherEmail}", teacherEmail);
                }
            }

            if (!await userManager.IsInRoleAsync(teacherUser, teacherRole))
            {
                var addToRoleResult = await userManager.AddToRoleAsync(teacherUser, teacherRole);

                if (!addToRoleResult.Succeeded)
                {
                    throw new InvalidOperationException(
                        $"Could not assign Teacher role: {FormatErrors(addToRoleResult)}");
                }

                logger.LogInformation("Assigned Teacher role to: {TeacherEmail}", teacherEmail);
            }
            else
            {
                logger.LogInformation("Teacher user already has Teacher role: {TeacherEmail}", teacherEmail);
            }

            logger.LogInformation("Production teacher seeding completed successfully.");
        }

        private static string FormatErrors(IdentityResult result)
        {
            return string.Join(
                "; ",
                result.Errors.Select(error => $"{error.Code}: {error.Description}"));
        }
    }
}