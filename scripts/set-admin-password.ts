import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

async function main() {
  const email = 'abolirisbud434@gmail.com';
  const newPassword = 'Admin@123456';

  console.log(`Setting admin password for ${email}...`);

  const { data: usersData, error: listError } = await supabase.auth.admin.listUsers();
  if (listError) {
    console.error('List users error:', listError);
    process.exit(1);
  }

  const user = usersData.users.find((u) => u.email?.toLowerCase() === email.toLowerCase());

  if (user) {
    const { error: updateError } = await supabase.auth.admin.updateUserById(user.id, {
      password: newPassword,
      email_confirm: true,
    });

    if (updateError) {
      console.error('Error updating password:', updateError);
      process.exit(1);
    }

    console.log(`✅ Password successfully updated for ${email}`);
    console.log(`🔑 Login Password: ${newPassword}`);
  } else {
    const { data: createData, error: createError } = await supabase.auth.admin.createUser({
      email,
      password: newPassword,
      email_confirm: true,
      user_metadata: { role: 'ADMIN', fullName: 'Aboli Risbud (Admin)' },
    });

    if (createError) {
      console.error('Error creating admin user:', createError);
      process.exit(1);
    }

    console.log(`✅ Admin user created in Supabase Auth`);
    console.log(`🔑 Login Password: ${newPassword}`);
  }
}

main().catch((err) => {
  console.error('Unexpected error:', err);
  process.exit(1);
});
