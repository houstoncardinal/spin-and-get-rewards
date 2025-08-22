import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				luxury: {
					black: 'hsl(var(--luxury-black))',
					charcoal: 'hsl(var(--luxury-charcoal))',
					gray: 'hsl(var(--luxury-gray))',
					silver: 'hsl(var(--luxury-silver))',
					platinum: 'hsl(var(--luxury-platinum))',
					pearl: 'hsl(var(--luxury-pearl))',
					gold: 'hsl(var(--luxury-gold))',
					'gold-dark': 'hsl(var(--luxury-gold-dark))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'spin': {
					from: { transform: 'rotate(0deg)' },
					to: { transform: 'rotate(360deg)' }
				},
				'pulse-glow': {
					'0%, 100%': { boxShadow: '0 0 20px hsl(var(--game-primary) / 0.3)' },
					'50%': { boxShadow: '0 0 40px hsl(var(--game-primary) / 0.6)' }
				},
				'luxury-glow': {
					'0%, 100%': { boxShadow: 'var(--shadow-elegant)' },
					'50%': { boxShadow: 'var(--shadow-gold)' }
				},
				'subtle-float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-2px)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'luxury-glow': 'luxury-glow 3s ease-in-out infinite',
				'subtle-float': 'subtle-float 4s ease-in-out infinite'
			},
			backgroundImage: {
				'gradient-main': 'var(--gradient-main)',
				'gradient-gold': 'var(--gradient-gold)',
				'gradient-silver': 'var(--gradient-silver)',
				'gradient-luxury': 'var(--gradient-luxury)'
			},
			boxShadow: {
				'luxury': 'var(--shadow-luxury)',
				'gold': 'var(--shadow-gold)',
				'elegant': 'var(--shadow-elegant)',
				'wheel': 'var(--shadow-wheel)'
			},
			fontFamily: {
				'display': ['Playfair Display', 'serif'],
				'sans': ['Inter', 'system-ui', 'sans-serif']
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
