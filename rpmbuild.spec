name: paypango-checkout-wallet
Version: 0.2
Release: 1.8
Summary: PAYPANGO checkout-wallet Page

Group: System
License: GPL

Requires: nodejs
BuildRoot: /opt/deployer/temp/checkout-wallet/paypango/rpmbuild/

%description
Paypango Checkout-Wallet Page

%prep
echo "BUILDROOT = $RPM_BUILD_ROOT"
mkdir -p /home/deployer/rpmbuild/RPMS/noarch/old
if [ "$(ls /home/deployer/rpmbuild/RPMS/noarch/*checkout-wallet*.rpm 2>/dev/null)" ];then
mv /home/deployer/rpmbuild/RPMS/noarch/*checkout-wallet*.rpm /home/deployer/rpmbuild/RPMS/noarch/old
fi
mkdir -p $RPM_BUILD_ROOT/opt/paypango/
mkdir -p $RPM_BUILD_ROOT/etc/systemd/system
cp -r /opt/deployer/temp/checkout $RPM_BUILD_ROOT/opt/paypango/checkout-wallet
mv $RPM_BUILD_ROOT/opt/paypango/checkout-wallet/.env $RPM_BUILD_ROOT/opt/paypango/checkout-wallet/.env.example
rm $RPM_BUILD_ROOT/opt/paypango/checkout-wallet/rpmbuild.spec
cd $RPM_BUILD_ROOT/opt/paypango/checkout-wallet
mv paypango-checkout-wallet.service $RPM_BUILD_ROOT/etc/systemd/system

exit

%pre

%post
systemctl daemon-reload
systemctl status paypango-checkout-wallet.service 2>&1 >/devnull
if [ $? -eq 0 ]
then
  echo Restarting paypango-checkout-wallet.service
  systemctl restart paypango-checkout-wallet.service
fi

%clean
rm -rf $RPM_BUILD_ROOT/opt

%files
%attr(-, paypango-checkout-wallet, paypango-checkout-wallet) /opt/paypango/checkout-wallet
%attr(0744, paypango-checkout-wallet, paypango-checkout-wallet) /opt/paypango/checkout-wallet/run.sh
%attr(0600, root, root) /etc/systemd/system/paypango-checkout-wallet.service

%changelog
