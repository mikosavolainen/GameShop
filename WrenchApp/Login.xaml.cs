using System;
using CredentialManagement;
using System.Security;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;
using System.Xml.Linq;

namespace WrenchApp
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class Login : Window
    {
        public Login()
        {
            InitializeComponent();
            Get_Credential();
        }

        private void Create_Credential(string username, string password)
        {
            // Create a new credential
            using (var cred = new Credential())
            {
                cred.Target = "WrenchApp";
                cred.Username = username;
                cred.Password = password;
                cred.Save(); 
            }
        }

        private void Get_Credential()
        {
            using (var cred = new Credential())
            {
                cred.Target = "WrenchApp";

                if (cred.Load())
                {
                    LoginFunc(true, cred.Username, cred.Password);
                }
            }
        }

        private void Close_Screen(object sender, EventArgs e)
        {
            this.Close();
        }

        private void Border_MouseLeftButtonDown(object sender, MouseButtonEventArgs e)
        {
            if (e.ChangedButton == MouseButton.Left)
            {
                this.DragMove();
            }
        }

        private void Log_In(object sender, RoutedEventArgs e)
        {
            LoginFunc(false, Username.Text, Password.Password.ToString());
        }

        async private void LoginFunc(bool autologin, string username, string password)
        {
            // Ensure username and password are given
            if ((username == "" || password == "") && !autologin)
            {
                MessageBox.Show("Missing information!", "Warning");
            } else
            {

                // Skip logic if in edit mode                
                if (ConfigurationManager.AppSettings["editmode"] == "true")
                {                                                          
                    if (!autologin)
                    {
                        Create_Credential(username, password);
                    }

                    ConfigurationManager.AppSettings["username"] = username;
                    Window mainWindow = new MainWindow();                   
                    mainWindow.Show();                                  
                    this.Close();                                      
                }                                                    


                var formContent = new FormUrlEncodedContent(new[]
                {
                    new KeyValuePair<string, string>("username", username),
                    new KeyValuePair<string, string>("password", password)
                });

                // Create a new HttpClient to handle the request
                HttpClient httpClient = new HttpClient();

                // Send a Get request to the specified URL

                try
                {
                    // Attempt to send login request
                    HttpResponseMessage response = await httpClient.PostAsync($"http://localhost:{ConfigurationManager.AppSettings["port"].ToString()}/login", formContent);

                    try
                    {
                        // Ensure response is ok and extract the jwt token
                        response.EnsureSuccessStatusCode();
                        string responseBody = await response.Content.ReadAsStringAsync();

                        MessageBox.Show($"{username}, {responseBody}");

                        // WRITE CODE ON SAVING JWT AUTH AND USERNAME
                        ConfigurationManager.AppSettings["username"] = username;
                        ConfigurationManager.AppSettings["JWT"] = responseBody;

                        if (!autologin)
                        {
                            Create_Credential(username, password);
                        }

                        // Open main window
                        Window mainWindow = new MainWindow();
                        mainWindow.Show();
                        this.Close();
                    } catch
                    {
                        if (autologin == true)
                        {
                            MessageBox.Show("Login information has changed, please log in again.", "Error");
                        } else
                        {
                            MessageBox.Show("Incorrect information!", "Error");
                        }
                    }

                } catch
                {
                    MessageBox.Show("Error connecting to server!", "Error");
                }
            }
        }

        private void Forgot_Password(object sender, EventArgs e)
        {
            MessageBox.Show("Too bad :(", "Sucks to suck");
        }

        private void Register(object sender, RoutedEventArgs e)
        {
            // Open register window
            Window register = new Register();
            register.Show();
            this.Close();
        }
    }
}
