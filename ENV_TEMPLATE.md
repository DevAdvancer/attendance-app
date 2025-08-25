# Environment Variables Template

Create a `.env.local` file in your project root with the following variables:

## Web3Forms Configuration

```bash
# Get your access key from https://web3forms.com/
NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=your_web3forms_access_key_here
```

## Supabase Configuration (if not already set)

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here
```

## How to get Web3Forms Access Key:

1. Go to [https://web3forms.com/](https://web3forms.com/)
2. Click "Get Access Key"
3. Enter your email address
4. Check your email for the access key
5. Copy the access key and paste it in your `.env.local` file

## Example .env.local file:

```bash
NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=YOUR_ACTUAL_ACCESS_KEY_HERE
```

**Note:** Replace `YOUR_ACTUAL_ACCESS_KEY_HERE` with the actual access key you receive from Web3Forms.
